import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../shared/models/project";
import {ProjectService} from "../../shared/services/project.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  dataValidationForm: FormGroup = this.formBuilder.group({});
  isNew: boolean = true;

  constructor(private projectService: ProjectService,
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
              descripcion: [data.descripcion, [Validators.required]],
              uid: [data.uid],
          });
      });
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
  }


}
 