import {Userstories} from '../../shared/models/userstories';
import {Component, OnInit} from '@angular/core';
import {UserstoriesService} from "../../shared/services/userstories.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-userstories',
    templateUrl: './userstories.component.html',
    styleUrls: ['./userstories.component.scss']
})
export class UserstoriesComponent implements OnInit {
    displayedColumns: string[] = ['estado', 'nombre',  'acciones'];
    dataSource: Userstories[] = [];

    constructor(private router: Router, private userstoriesService: UserstoriesService) {
    }

    ngOnInit(): void {
        this.findUserstories();
    }

    findUserstories() {
        this.userstoriesService.list()
        .subscribe(response => {
            this.dataSource = response.stories;
        });
    }

    navigateToEditUserstories(uid: string) {
        this.router.navigate(['/stories/', uid, 'edit']);
    }

    navigateToCreateUserstories() {
        this.router.navigate(['/stories/create']);
    }

    delete(element: Userstories) {
        this.userstoriesService.delete(element).subscribe(value => {
           if (value) {
               this.findUserstories();
           }
        });
    }
}
