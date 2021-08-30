// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {Permission} from '../models/permission';
import {map} from "rxjs/operators";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "permisos": Permission[]
}

@Injectable({
    providedIn: 'root',
})
export class PermissionsService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/permisos`);
    }

    find(uid: string): Observable<Permission> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/permisos`, {params})
            .pipe(
                map(value => value.permisos[0])
            );
    }

    create(permission: Permission): Observable<Permission> {
        return this.http.post<Permission>(`${environment.SERVER_API_URL}/permisos`, permission);
    }

    edit(permission: Permission): Observable<Permission> {
        return this.http.put<Permission>(`${environment.SERVER_API_URL}/permisos/${permission.uid}`, permission);
    }

    delete(permission: Permission): Observable<Permission> {
        return this.http.delete<Permission>(`${environment.SERVER_API_URL}/permisos/${permission.uid}`);
    }
}
