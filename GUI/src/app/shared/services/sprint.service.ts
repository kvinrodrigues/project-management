// Project
import {environment} from 'src/environments/environment';
import {Sprint} from '../models/sprint';
import {map} from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ValueUnavailableKind} from "@angular/compiler-cli/src/ngtsc/reflection";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "sprint": Sprint[]
}

@Injectable({
    providedIn: 'root',
})
export class SprintService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/sprints`);
    }

    find(uid: string): Observable<Sprint> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/sprints`, {params})
            .pipe(
                map(value => value.sprint[0])
            );
    }

    create(sprint: Sprint): Observable<Sprint> {
        let userStoriesIdentifiers = sprint.userstories.map(value => value._id);
        const request = {
            "proyecto": sprint.proyecto.uid,
            "userstories": userStoriesIdentifiers
        };

        return this.http.post<Sprint>(`${environment.SERVER_API_URL}/sprints`, request);
    }

    edit(sprint: Sprint): Observable<Sprint> {
        return this.http.put<Sprint>(`${environment.SERVER_API_URL}/sprints/${sprint._id}`, sprint);
    }

    delete(sprint: Sprint): Observable<Sprint> {
        return this.http.delete<Sprint>(`${environment.SERVER_API_URL}/sprints/${sprint._id}`);
    }
}
