import {Backlog} from '../../shared/models/backlog';
import {Component, OnInit} from '@angular/core';
import {BacklogService} from "../../shared/services/backlog.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
    displayedColumns: string[] = [  'uid', 'backlog','acciones'];
    dataSource: Backlog[] = [];

    constructor(private router: Router, private BacklogService: BacklogService) {
    }

    ngOnInit(): void {
        this.findBacklog();
    }

    findBacklog() {
        this.BacklogService.list()
        .subscribe(response => {
            this.dataSource = response.backlog;
        });
    }

    navigateToEditBacklog(uid: string) {
        this.router.navigate(['/backlog/', uid, 'edit']);
    }

    navigateToCreateBacklog() {
        this.router.navigate(['/backlog/create']);
    }

    delete(element: Backlog) {
        this.BacklogService.delete(element).subscribe(value => {
           if (value) {
               this.findBacklog();
           }
        });
    }
}
