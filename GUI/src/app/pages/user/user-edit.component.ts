import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {RolService} from "../../shared/services/rol.service";
import {Observable} from "rxjs";
import {Rol} from "../../shared/models/rol";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;
    rolObservable: Observable<Rol[]> = this.roleService.getRoles()
        .pipe(map((value => value.roles)));

    constructor(private userService: UserService,
                private roleService: RolService,
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
                nombre: [data.nombre, [Validators.required]],
                correo: [data.correo, [Validators.required]],
                rol: [data.rol, [Validators.required]],
                uid: [data.uid],
            });
        });
    }

    callOnSubmit() {
        let user = new User(this.dataValidationForm?.value.nombre,
            this.dataValidationForm?.value.correo,
            this.dataValidationForm?.value.rol,
            this.dataValidationForm?.value.uid)

        if (this.isNew) {
            this.userService.create(user)
                .subscribe(value => console.log(`Se creo el usuario: ${value}`));
        } else {
            this.userService.edit(user)
                .subscribe(value => console.log(`Se modifico el usuario: ${value}`));
        }
    }

}
