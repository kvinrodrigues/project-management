import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectEditComponent} from "./project-edit.component";
import {Project} from "../../shared/models/project";
import {ProjectService} from "../../shared/services/project.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProjectResolve implements Resolve<Project> {
    constructor(private service: ProjectService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Project());
    }
}

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent
    },
    {
        path: ':uid/edit',
        component: ProjectEditComponent,
        resolve: {
            data: ProjectResolve
        }
    },
    {
        path: 'create',
        component: ProjectEditComponent,
        resolve: {
            data: ProjectResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {
}
