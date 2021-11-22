import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {SprintService} from "../../shared/services/sprint.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-sprint-edit',
    templateUrl: './sprint-edit.component.html',
    styleUrls: ['./sprint-edit.component.scss']
})
export class SprintEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;

    constructor(private SprintService: SprintService,
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
                nombre_proyecto: [data.nombre_proyecto, [Validators.required]],
                uid: [data.uid],
            });
        });
    }

    callOnSubmit(): void {

    }

}
