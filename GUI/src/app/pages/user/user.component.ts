import {User} from '../../shared/models/user';
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['estado', 'nombre', 'correo', 'rol', 'uid', 'acciones'];
    dataSource: User[] = [];

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.findUsers();
    }

    findUsers() {
        this.userService.list()
        .subscribe(response => {
            this.dataSource = response.usuarios;
        });
    }

    navigateToEditUser(uid: string) {
        this.router.navigate(['/user/', uid, 'edit']);
    }

    navigateToCreateUser() {
        this.router.navigate(['/user/create']);
    }

    delete(element: User) {
        this.userService.delete(element).subscribe(value => {
           if (value) {
               this.findUsers();
           }
        });
    }
}
