import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {UserstoriesComponent} from './userstories.component';
import {UserstoriesEditComponent} from "./userstories-edit.component";
import {Userstories} from "../../shared/models/userstories";
import {UserstoriesService} from "../../shared/services/userstories.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserstoriesResolve implements Resolve<Userstories> {
    constructor(private service: UserstoriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Userstories> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Userstories());
    }
}

const routes: Routes = [
    {
        path: '',
        component: UserstoriesComponent
    },
    {
        path: ':uid/edit',
        component: UserstoriesEditComponent,
        resolve: {
            data: UserstoriesResolve
        }
    },
    {
        path: 'create',
        component: UserstoriesEditComponent,
        resolve: {
            data: UserstoriesResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserstoriesRoutingModule {
}
