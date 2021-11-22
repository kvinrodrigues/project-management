import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserEditComponent} from "./user-edit.component";
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserResolve implements Resolve<User> {
    constructor(private service: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new User());
    }
}

const routes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: ':uid/edit',
        component: UserEditComponent,
        resolve: {
            data: UserResolve
        }
    },
    {
        path: 'create',
        component: UserEditComponent,
        resolve: {
            data: UserResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
