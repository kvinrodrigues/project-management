import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Permission} from "../../shared/models/permission";
import {PermissionsService} from "../../shared/services/permissions.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-permission-edit',
    templateUrl: './permission-edit.component.html',
    styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;

    constructor(private permissionService: PermissionsService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.activatedRoute.data.subscribe(({data}) => {
            if (data?.uid) {
                this.isNew = false;
            }

            this.dataValidationForm = this.formBuilder.group({
                nombre_permiso: [data.nombre_permiso, [Validators.required]],
                descripcion: [data.descripcion, [Validators.required]],
                uid: [data.uid],
            });
        });
    }

    callOnSubmit() {
        let permission = new Permission(this.dataValidationForm?.value.nombre_permiso,
            this.dataValidationForm?.value.descripcion,
            this.dataValidationForm?.value.uid)

        if (this.isNew) {
            this.permissionService.create(permission)
                .subscribe(value => console.log(`Se creo el permiso: ${value}`));
        } else {
            this.permissionService.edit(permission)
                .subscribe(value => console.log(`Se modifico el permiso: ${value}`));
        }

        setTimeout(() => {
            window.history.back()
        }, 500);
    }

}
