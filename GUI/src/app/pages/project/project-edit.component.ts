import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../shared/models/project";
import {ProjectService} from "../../shared/services/project.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";
import {Permission} from "../../shared/models/permission";

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
                users: [data?.usuarios],
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
        const membersOfTheProject: User[] = this.dataValidationForm.value.users;
        let membersIdentifiers = membersOfTheProject.map(value => value.uid);

        let project = new Project(this.dataValidationForm?.value.nombre_proyecto,
            this.dataValidationForm?.value.descripcion,
            membersIdentifiers,
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

    compareMembersObjects(object1: User, object2: any) {
        return object1 && object2 && object1.uid == object2._id;
    }

}
