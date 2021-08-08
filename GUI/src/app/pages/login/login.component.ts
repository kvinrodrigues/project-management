import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    authenticationError: boolean = false;
    email: string = "";
    password: string = "";
    loading = false;
    hide = true;

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit(): void {
    }

    login(): any {
        this.loading = true;
        this.loginService.login({
            correo: this.email,
            password: this.password
        })
            .then(() => {
                this.authenticationError = false;
                this.loading = false;
                this.router.navigate(['home']);
            })
            .catch((error: any) => {
                console.log(error);
                this.authenticationError = true;
                this.loading = false;
            });
    }

    isLoginButtonEnabled() {
        return (this.email && this.password) && !this.loading;
    }

    getErrorMessage() {
        return "Favor, verifique usuario y contraseña";
    }

    protected showMessage(message: string, detail: string, severity: string) {
        // this.messageService.add({severity: severity, summary: message, detail: detail});
    }
}
