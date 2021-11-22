// Angular
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {Backlog} from '../models/backlog';

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "backlog": Backlog[]
}

@Injectable({
    providedIn: 'root',
})
export class BacklogService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/backlogs`);
    }

    find(uid: string): Observable<Backlog> {
        return this.http.get<Backlog>(`${environment.SERVER_API_URL}/backlogs/${uid}`);
    }

    create(backlog: Backlog): Observable<Backlog> {
        const request = {
            "userstories": backlog.userstories.map(value => value._id),
            "nombre": backlog.nombre
        }

        return this.http.post<Backlog>(`${environment.SERVER_API_URL}/backlogs`, request);
    }

    edit(backlog: Backlog): Observable<Backlog> {
        const request = {
            "userstories": backlog.userstories.map(value => value._id),
            "nombre": backlog.nombre
        }
        return this.http.put<Backlog>(`${environment.SERVER_API_URL}/backlogs/${backlog._id}`, request);
    }

    delete(backlog: Backlog): Observable<Backlog> {
        return this.http.delete<Backlog>(`${environment.SERVER_API_URL}/backlogs/${backlog._id}`);
    }
}
