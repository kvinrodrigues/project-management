import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    toggle() {
    }

    isAuthenticated(): Observable<boolean> {
        return this.authenticationService.isAuthenticated();
    }

    profile() {
    }

    logout() {
    }

}
