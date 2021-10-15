import {Component, OnInit} from '@angular/core';
import {RolService} from "../../shared/services/rol.service";
import {Router} from "@angular/router";
import {Rol} from "../../shared/models/rol";

@Component({
    selector: 'app-rol',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
    displayedColumns: string[] = ['uid', 'rol', 'descripcion', 'estado', 'acciones'];
    dataSource: Rol[] = [];

    constructor(private router: Router, private rolService: RolService) {
    }

    ngOnInit(): void {
        this.findRoles();
    }

    findRoles() {
        this.rolService.list()
            .subscribe(response => {
                this.dataSource = response.roles;
            });
    }

    navigateToEditPermission(uid: string) {
        this.router.navigate(['/role/', uid, 'edit']);
    }

    navigateToCreateRole() {
        this.router.navigate(['/role/create']);
    }

    delete(role: Rol) {
        this.rolService.delete(role)
            .subscribe((response) => {
                if (response) {
                    this.findRoles();
                }
            })
    }
}
