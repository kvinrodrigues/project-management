import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    mode: String = "";
    screenWidth: number | undefined = undefined;

    constructor(private authenticationService: AuthenticationService) {
    }

    updateSidenavMode() {
        let condition = this.isResponsive();
        if (condition) {
            this.mode = 'over';
        } else {
            this.mode = 'side';
        }
    }

    isResponsive(): boolean {
        return <boolean>(this.screenWidth && this.screenWidth < 960);
    }

    isAuthenticated(): Observable<boolean> {
        return this.authenticationService.isAuthenticated();
    }

}
