import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Userstories} from "../../shared/models/userstories";
import {UserstoriesService} from "../../shared/services/userstories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-userstories-edit',
    templateUrl: './userstories-edit.component.html',
    styleUrls: ['./userstories-edit.component.scss']
})
export class UserstoriesEditComponent implements OnInit {
    dataValidationForm: FormGroup = this.formBuilder.group({});
    isNew: boolean = true;

    constructor(private userstoriesService: UserstoriesService,
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
                proyecto: [data.proyecto, [Validators.required]],
            });
        });
    }

    callOnSubmit() {
        let userstories = new Userstories(this.dataValidationForm?.value.proyecto,
            )

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
