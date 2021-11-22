import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { BacklogComponent } from './backlog.component';
import {BacklogEditComponent} from "./backlog-edit.component";
import {Backlog} from "../../shared/models/backlog";
import {BacklogService} from "../../shared/services/backlog.service";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class BacklogResolve implements Resolve<Backlog> {
    constructor(private service: BacklogService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Backlog> {
        const uid = route.params['uid'] ? route.params['uid'] : null;
        if (uid) {
            return this.service.find(uid);
        }
        return of(new Backlog());
    }
}

const routes: Routes = [
  { path: '', 
    component: BacklogComponent },
    {
      path: ':uid/edit',
      component: BacklogEditComponent,
      resolve: {
        data: BacklogResolve
      }
    },
    {
      path: 'create',
      component: BacklogEditComponent,
      resolve: {
        data: BacklogResolve
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacklogRoutingModule { } 