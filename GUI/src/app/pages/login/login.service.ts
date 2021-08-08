import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
    }

    login(credentials: { correo?: string; password?: string; }) {
        return new Promise((resolve, reject) => {
            this.authenticationService.login(credentials).subscribe(
                (data: any) => {
                    this.authenticationService.authenticate(data);
                    resolve(data);
                },
                (error: any) => {
                    this.logout();
                    reject(error);
                }
            );
        });
    }

    logout() {
        AuthenticationService.logout();
        this.authenticationService.authenticate(null);
    }

    redirectToLogin() {
        setTimeout(() => this.router.navigate(['login']), 1);
    }
}
