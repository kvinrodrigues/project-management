import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RolService} from "../../shared/services/rol.service";
import {Rol} from "../../shared/models/rol";
import {PermissionsService} from "../../shared/services/permissions.service";
import {Permission} from "../../shared/models/permission";

@Component({
    selector: 'app-rol-edit',
    templateUrl: './rol-edit.component.html',
    styleUrls: ['./rol-edit.component.scss']
})
export class RolEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    availablePermissions: Permission[] = [];
    isNew: boolean = true;

    constructor(private rolService: RolService,
                private permissionService: PermissionsService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.findAvailablePermissions();
    }

    private buildForm(): void {
        this.activatedRoute.data.subscribe(({data}) => {
            if (data?.uid) {
                this.isNew = false;
            }

            this.dataValidationForm = this.formBuilder.group({
                rol: [data?.rol, [Validators.required]],
                descripcion: [data?.descripcion, [Validators.required]],
                permissions: [data?.permissions],
                uid: [data?.uid],
            });
        });
    }

    private findAvailablePermissions() {
        this.permissionService.list().subscribe(value => {
          this.availablePermissions = value.permisos;
        })
    }

    callOnSubmit() {
        let role = new Rol(this.dataValidationForm?.value.rol,
            this.dataValidationForm?.value.descripcion,
            this.dataValidationForm?.value.uid)

        if (this.isNew) {
            this.rolService.create(role)
                .subscribe(value => console.log(`Se creo el rol: ${value}`));
        } else {
            this.rolService.edit(role)
                .subscribe(value => console.log(`Se modifico el rol: ${value}`));
        }

        setTimeout(() => {
            window.history.back()
        }, 500);
    }
}
