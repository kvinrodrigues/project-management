import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {PermissionsComponent} from './permissions.component';
import {PermissionEditComponent} from "./permission-edit.component";
import {Permission} from "../../shared/models/permission";
import {PermissionsService} from "../../shared/services/permissions.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class PermissionResolve implements Resolve<Permission> {
    constructor(private service: PermissionsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Permission> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Permission());
    }
}

const routes: Routes = [
    {
        path: '',
        component: PermissionsComponent,
    },
    {
        path: ':uid/edit',
        component: PermissionEditComponent,
        resolve: {
            data: PermissionResolve
        }
    },
    {
        path: 'create',
        component: PermissionEditComponent,
        resolve: {
            data: PermissionResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionsRoutingModule {
}
