import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {SprintComponent} from './sprint.component';
import {SprintEditComponent} from "./sprint-edit.component";
import {Sprint} from "../../shared/models/sprint";
import {SprintService} from "../../shared/services/sprint.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserResolve implements Resolve<Sprint> {
    constructor(private service: SprintService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sprint> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Sprint());
    }
}

const routes: Routes = [
    {
        path: '',
        component: SprintComponent
    },
    {
        path: ':uid/edit',
        component: SprintEditComponent,
        resolve: {
            data: UserResolve
        }
    },
    {
        path: 'create',
        component: SprintEditComponent,
        resolve: {
            data: UserResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpirntRoutingModule {
}
