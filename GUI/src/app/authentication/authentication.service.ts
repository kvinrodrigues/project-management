import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {SERVER_API_URL} from "../shared/app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userIdentity: any;
  private authenticated = new BehaviorSubject<boolean>(false);
  private authenticationState = new Subject<any>();
  public refreshingToken: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.authenticated.next(false);
  }

  authenticate(identity: any) {
    this.userIdentity = identity;
    this.authenticated.next(identity !== null);
    this.authenticationState.next(this.userIdentity);
  }

  storeAuthenticationToken(jwt: any) {
    sessionStorage.setItem('authenticationToken', jwt.id_token);
  }

  static logout() {
    sessionStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
  }

  login(credentials: any): Observable<any> {
    const data = {
      correo: credentials.correo,
      password: credentials.password,
    };

    const authenticateSuccess = (resp: any) => {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt);
        return jwt;
      }
    }

    return this.http.post(SERVER_API_URL + 'auth/login', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
  }

  private authenticateSuccess(resp: any): any {
    const bearerToken = resp.body.id_token;
    this.storeAuthenticationToken(resp.body);
    return bearerToken;
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
}
