import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Userstories} from "../../shared/models/userstories";
import {UserstoriesService} from "../../shared/services/userstories.service";
import {ActivatedRoute} from "@angular/router";
import { ProjectService } from 'src/app/shared/services/project.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-userstories-edit',
    templateUrl: './userstories-edit.component.html',
    styleUrls: ['./userstories-edit.component.scss']
})
export class UserstoriesEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;
    projectObservable: Observable<Project[]> = this.projectService.list()
        .pipe(map((value => value.proyectos)));

    constructor(private userstoriesService: UserstoriesService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private projectService: ProjectService) {
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
                titulo: [data.titulo, [Validators.required]],
                solicitante: [data.solicitante, [Validators.required]],
                descripcion: [data.descripcion, [Validators.required]],
                proyecto: [data.proyecto, [Validators.required]],
                uid: [data.uid],
            });

        });
    }

    callOnSubmit() {
        let userstories = new Userstories(this.dataValidationForm?.value.titulo,
            this.dataValidationForm?.value.solicitante,
            this.dataValidationForm?.value.descripcion,
            this.dataValidationForm?.value.proyecto.nombre_proyecto)

        if (this.isNew) {
            this.userstoriesService.create(userstories)
                .subscribe(value => console.log(`Se creo la historia de usuario: ${value}`));
        } else {
            this.userstoriesService.edit(userstories)
                .subscribe(value => console.log(`Se modifico la historia de usuario: ${value}`));
        }

        setTimeout(() => {window.history.back();}, 500)
    }

}
