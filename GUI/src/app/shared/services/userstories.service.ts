// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {Userstories} from '../models/userstories';
import {map} from "rxjs/operators";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "stories": Userstories[]
}

@Injectable({
    providedIn: 'root',
})
export class UserstoriesService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/stories`);
    }

    find(uid: string): Observable<Userstories> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/stories`, {params})
            .pipe(
                map(value => value.stories[0])
            );
    }

    create(stories: Userstories): Observable<Userstories> {
        return this.http.post<Userstories>(`${environment.SERVER_API_URL}/stories`, stories);
    }

    edit(stories: Userstories): Observable<Userstories> {
        return this.http.put<Userstories>(`${environment.SERVER_API_URL}/stories/${stories.uid}`, stories);
    }

    delete(stories: Userstories): Observable<Userstories> {
        return this.http.delete<Userstories>(`${environment.SERVER_API_URL}/stories/${stories.uid}`);
    }
}
