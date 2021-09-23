// Angular
import { Component, OnInit } from '@angular/core';

// Project
import {Project} from '../../shared/models/project';
import {Router} from "@angular/router";
import {ProjectService} from "../../shared/services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    displayedColumns: string[] = ['estado', 'usuarios', 'nombre_proyecto', 'descripcion', 'uid', 'acciones'];
    dataSource: Project[] = [];

    constructor(private router: Router, private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.findProjects();
    }

    findProjects() {
        this.projectService.list()
            .subscribe(response => {
                this.dataSource = response.proyectos;
            });
    }

    navigateToEditProject(uid: string) {
        this.router.navigate(['/project/', uid, 'edit']);
    }

    navigateToCreateProject() {
        this.router.navigate(['/project/create']);
    }

}
 