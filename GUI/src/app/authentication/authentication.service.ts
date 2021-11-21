import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SERVER_API_URL} from "../shared/app.constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userIdentity: any;
  private authenticated = new BehaviorSubject<boolean>(false);
  private authenticationState = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    this.authenticated.next(false);
  }

  authenticate(identity: any) {
    this.userIdentity = identity;
    this.authenticated.next(identity !== null);
    this.authenticationState.next(this.userIdentity);
  }

  storeAuthenticationToken(jwt: any) {
    sessionStorage.setItem('authenticationToken', jwt);
    localStorage.setItem('authenticationToken', jwt);
  }

  static logout() {
    sessionStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('permissions');
  }

  login(credentials: any): Observable<any> {
    const authenticateSuccess = (resp: any) => {
      const token = resp.body.token;
      this.storeAuthenticationToken(token);
      return token;

    }

    return this.http.post(SERVER_API_URL + '/auth/login', credentials, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
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
