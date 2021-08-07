import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    toggle() {
    }

    isAuthenticated(): Observable<boolean> {
        return this.authenticationService.isAuthenticated();
    }

    seeAdministrationMenu() {
        return true
    }

    checkRoles() {
        return true
    }

}
