import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {SprintService} from "../../shared/services/sprint.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../shared/models/project";
import {Sprint} from "../../shared/models/sprint";
import {Observable} from "rxjs";
import {Userstories} from "../../shared/models/userstories";
import {map} from "rxjs/operators";
import {UserstoriesService} from "../../shared/services/userstories.service";
import {ProjectService} from "../../shared/services/project.service";

@Component({
    selector: 'app-sprint-edit',
    templateUrl: './sprint-edit.component.html',
    styleUrls: ['./sprint-edit.component.scss']
})
export class SprintEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});

    availableUserStories: Observable<Userstories[]> = this.userstoriesService.list()
        .pipe(map((value => value.userstories)));
    projectObservable: Observable<Project[]> = this.projectService.list()
        .pipe(map((value => value.proyectos)));
    isNew: boolean = true;

    constructor(private sprintService: SprintService,
                private userstoriesService: UserstoriesService,
                private projectService: ProjectService,
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
                userstories: [data.userstories, [Validators.required]],
                proyecto: [data.proyecto, [Validators.required]],
                uid: [data.uid],
            });
        });
    }

    callOnSubmit(): void {
        let sprint = new Sprint(this.dataValidationForm?.value?.proyecto,
            this.dataValidationForm?.value?.userstories,
            this.dataValidationForm?.value?.uid)

        if (this.isNew) {
            this.sprintService.create(sprint)
                .subscribe(value => console.log(`Se creo el sprint: ${value}`));
        } else {
            this.sprintService.edit(sprint)
                .subscribe(value => console.log(`Se modifico el sprint: ${value}`));
        }

        setTimeout(() => {
            window.history.back();
        }, 500)
    }

    compareUserStoriesObjects(object1: Project, object2: any) {
        return object1 && object2 && object1.uid == object2.uid;
    }

    compareProjectsObjects(object1: Project, object2: any) {
        return object1 && object2 && object1.uid == object2.uid;
    }
}
