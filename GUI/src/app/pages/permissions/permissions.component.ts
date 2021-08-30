// Angular
import {Component, OnInit} from '@angular/core';

// Project
import {Permission} from '../../shared/models/permission';
import {Router} from "@angular/router";
import {PermissionsService} from "../../shared/services/permissions.service";

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
    displayedColumns: string[] = ['nombre_permiso', 'descripcion', 'uid', 'acciones'];
    dataSource: Permission[] = [];

    constructor(private router: Router, private permissionService: PermissionsService) {
    }

    ngOnInit(): void {
        this.findPermissions();
    }

    findPermissions() {
        this.permissionService.list()
            .subscribe(response => {
                this.dataSource = response.permisos;
            });
    }

    navigateToEditPermission(uid: string) {
        this.router.navigate(['/permissions/', uid, 'edit']);
    }

    navigateToCreatePermission() {
        this.router.navigate(['/permissions/create']);
    }
}
