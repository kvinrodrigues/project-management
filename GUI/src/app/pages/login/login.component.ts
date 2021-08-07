import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    authenticationError: boolean = false;
    username: string = "";
    password: string = "";
    loading = false;
    hide = true;

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
    }

    login(): any {
        this.loading = true;
        this.authService.authenticateMePls();
        this.router.navigate(['home']);
    }

    isLoginButtonEnabled() {
        return (this.username && this.password) && !this.loading;
    }

    getErrorMessage() {
        return "INVALID_LOGIN";
    }

    protected showMessage(message: string, detail: string, severity: string) {
        // this.messageService.add({severity: severity, summary: message, detail: detail});

    }

}
