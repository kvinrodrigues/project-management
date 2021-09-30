import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then((value) => value.LoginModule),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((value) => value.HomeModule),
    },
    {
        path: 'permission',
        loadChildren: () =>
            import('./pages/permissions/permissions.module').then(
                (module) => module.PermissionsModule
            ),
    },

    {
        path: 'user',
        loadChildren: () =>
            import('./pages/user/user.module').then(
                (module) => module.UserModule
            ),
    },
    {
        path: 'role',
        loadChildren: () =>
            import('./pages/rol/rol.module').then(
                (module) => module.RolModule
            ),
    },
    {
        path: 'project',
        loadChildren: () =>
            import('./pages/project/project.module').then(
                (module) => module.ProjectModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
