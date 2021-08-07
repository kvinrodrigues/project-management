import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userIdentity: any;
  public isNew: boolean = false;
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

  authenticateMePls() {
    this.authenticated.next(true);
  }

  storeAuthenticationToken(jwt: any) {
    sessionStorage.setItem('authenticationToken', jwt.id_token);
    sessionStorage.setItem('expirationDate', jwt.expiration_date);
    sessionStorage.setItem('refreshTime', jwt.refresh_time);
  }

  static logout() {
    sessionStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('username');
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
