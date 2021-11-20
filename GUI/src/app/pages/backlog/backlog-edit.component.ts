import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Backlog} from "../../shared/models/backlog";
import {BacklogService} from "../../shared/services/backlog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-backlog-edit',
    templateUrl: './backlog-edit.component.html',
    styleUrls: ['./backlog-edit.component.scss']
})
export class BacklogEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;

    constructor(private BacklogService: BacklogService,
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

    callOnSubmit() {
        let backlog = new Backlog(this.dataValidationForm?.value.proyecto,
                                          this.dataValidationForm?.value.uid )

        if (this.isNew) {
            this.BacklogService.create(backlog)
                .subscribe(value => console.log(`Se creo la historia de usuario: ${value}`));
        } else {
            this.BacklogService.edit(backlog)
                .subscribe(value => console.log(`Se modifico la historia de usuario: ${value}`));
        }

        setTimeout(() => {window.history.back();}, 500)
    }

}
