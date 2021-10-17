import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../shared/models/project";
import {ProjectService} from "../../shared/services/project.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

    dataValidationForm: FormGroup = this.formBuilder.group({});
    availableUsers: User[] = []
    isNew: boolean = true;

    constructor(private projectService: ProjectService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.findAvailableUsers();
    }

    private buildForm(): void {
        this.activatedRoute.data.subscribe(({data}) => {
            if (data?.uid) {
                this.isNew = false;
            }

            this.dataValidationForm = this.formBuilder.group({
                nombre_proyecto: [data.nombre_proyecto, [Validators.required]],
                descripcion: [data.descripcion, [Validators.required]],
                users: [data?.users],
                uid: [data.uid],
            });
        });
    }

    private findAvailableUsers(): void {
        this.userService.list().subscribe((value) => {
                this.availableUsers = value.usuarios;
            }
        );
    }

    callOnSubmit() {
        let project = new Project(this.dataValidationForm?.value.nombre_proyecto,
            this.dataValidationForm?.value.descripcion,
            this.dataValidationForm?.value.uid)

        if (this.isNew) {
            this.projectService.create(project)
                .subscribe(value => console.log(`Se creo el proyecto: ${value}`));
        } else {
            this.projectService.edit(project)
                .subscribe(value => console.log(`Se modifico el proyecto: ${value}`));
        }

        setTimeout(() => {
            window.history.back()
        }, 500);
    }


}
