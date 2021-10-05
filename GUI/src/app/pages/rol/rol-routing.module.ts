import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {RolComponent} from './rol.component';
import {RolEditComponent} from "./rol-edit.component";
import {Observable, of} from "rxjs";
import {Rol} from "../../shared/models/rol";
import {RolService} from "../../shared/services/rol.service";

@Injectable({providedIn: 'root'})
export class RolResolve implements Resolve<Rol> {
    constructor(private service: RolService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rol> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Rol());
    }
}

const routes: Routes = [
    {
        path: '',
        component: RolComponent
    },
    {
        path: ':uid/edit',
        component: RolEditComponent,
        resolve: {
            data: RolResolve
        }
    },
    {
        path: 'create',
        component: RolEditComponent,
        resolve: {
            data: RolResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolRoutingModule {
}
