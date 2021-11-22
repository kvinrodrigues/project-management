import {Component, OnInit} from '@angular/core';
import {SprintService} from "../../shared/services/sprint.service";
import {Router} from "@angular/router";
import {Sprint} from 'src/app/shared/models/sprint';


@Component({
    selector: 'app-sprint',
    templateUrl: './sprint.component.html',
    styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {
    displayedColumns: string[] = ['proyecto', 'fecha_inicio', '_id', 'estado', 'acciones'];
    dataSource: Sprint[] = [];

    constructor(private router: Router, private SprintService: SprintService) {
    }

    ngOnInit(): void {
        this.findSprint();
    }

    findSprint() {
        this.SprintService.list()
            .subscribe(response => {
                this.dataSource = response.sprint;
            });
    }

    navigateToEditSprint(_id: string) {
        this.router.navigate(['/sprint/', _id, 'edit']);
    }

    navigateToCreateSprint() {
        this.router.navigate(['/sprint/create']);
    }

    delete(element: Sprint) {
        this.SprintService.delete(element).subscribe(value => {
            if (value) {
                this.findSprint();
            }
        });
    }
}
