// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {Backlog} from '../models/backlog';
import {map} from "rxjs/operators";

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
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/backlog`);
    }

    find(uid: string): Observable<Backlog> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/backlog`, {params})
            .pipe(
                map(value => value.backlog[0])
            );
    }

    create(backlog: Backlog): Observable<Backlog> {
        return this.http.post<Backlog>(`${environment.SERVER_API_URL}/backlog`, backlog);
    }

    edit(backlog: Backlog): Observable<Backlog> {
        return this.http.put<Backlog>(`${environment.SERVER_API_URL}/backlog/${backlog.uid}`, backlog);
    }

    delete(backlog: Backlog): Observable<Backlog> {
        return this.http.delete<Backlog>(`${environment.SERVER_API_URL}/backlog/${backlog.uid}`);
    }
}