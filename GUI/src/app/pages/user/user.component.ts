import {User} from '../../shared/models/user';
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['estado', 'nombre', 'correo', 'rol', 'uid', 'acciones'];
    dataSource: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.findUsers();
    }

    findUsers() {
        this.userService.getUsers()
            .subscribe(response => {
                this.dataSource = response.usuarios;
            });
    }

    addData(): void {
        console.log("Agrega Datos")
    }
}
