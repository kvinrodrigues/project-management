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

    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.findUsers();
    }

    findUsers() {
        this.projectService.getUsers()
            .subscribe(response => {
                this.dataSource = response.proyectos;
            });
    }

    addData(): void {
        console.log("Agrega Datos")
    }

}
