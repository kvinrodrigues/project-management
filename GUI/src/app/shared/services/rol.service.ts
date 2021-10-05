// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Role
import {environment} from 'src/environments/environment';
import {Rol} from '../models/rol';
import {Permission} from "../models/permission";
import {map} from "rxjs/operators";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "roles": Rol[]
}

@Injectable({
    providedIn: 'root',
})
export class RolService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/roles`);
    }

    find(uid: string): Observable<Rol> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/roles`, {params})
            .pipe(
                map(value => value.roles[0])
            );
    }

    create(role: Rol): Observable<Permission> {
        return this.http.post<Permission>(`${environment.SERVER_API_URL}/roles`, role);
    }

    edit(role: Rol): Observable<Permission> {
        return this.http.put<Permission>(`${environment.SERVER_API_URL}/roles/${role.uid}`, role);
    }

    delete(role: Rol): Observable<Permission> {
        return this.http.delete<Permission>(`${environment.SERVER_API_URL}/roles/${role.uid}`);
    }
}
