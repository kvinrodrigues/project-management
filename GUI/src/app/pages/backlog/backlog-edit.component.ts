import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Backlog} from "../../shared/models/backlog";
import {BacklogService} from "../../shared/services/backlog.service";
import {ActivatedRoute} from "@angular/router";
import {Userstories} from "../../shared/models/userstories";
import {UserstoriesService} from "../../shared/services/userstories.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Project} from "../../shared/models/project";

@Component({
    selector: 'app-backlog-edit',
    templateUrl: './backlog-edit.component.html',
    styleUrls: ['./backlog-edit.component.scss']
})
export class BacklogEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});

    availableUserStories: Observable<Userstories[]> = this.userstoriesService.list()
        .pipe(map((value => value.userstories)));
    isNew: boolean = true;

    constructor(private backlogService: BacklogService,
                private userstoriesService: UserstoriesService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.activatedRoute.data.subscribe(({data}) => {
            if (data?._id) {
                this.isNew = false;
            }

            this.dataValidationForm = this.formBuilder.group({
                nombre: [data.nombre, [Validators.required]],
                userstories: [data.userstories, [Validators.required]],
                uid: [data._id],
            });
        });
    }

    callOnSubmit() {
        let backlog = new Backlog(this.dataValidationForm?.value?.nombre,
            this.dataValidationForm?.value?.userstories,
            this.dataValidationForm?.value?.uid)

        if (this.isNew) {
            this.backlogService.create(backlog)
                .subscribe(value => console.log(`Se creo la historia de usuario: ${value}`));
        } else {
            this.backlogService.edit(backlog)
                .subscribe(value => console.log(`Se modifico la historia de usuario: ${value}`));
        }

        setTimeout(() => {
            window.history.back();
        }, 500)
    }

    compareUserStoriesObjects(object1: Project, object2: any) {
        return object1 && object2 && object1.uid == object2.uid;
    }

}
