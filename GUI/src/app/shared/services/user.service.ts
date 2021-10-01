// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {User} from '../models/user';
import {map} from "rxjs/operators";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "usuarios": User[]
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/usuarios`);
    }

    find(uid: string): Observable<User> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/usuarios`, {params})
            .pipe(
                map(value => value.usuarios[0])
            );
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${environment.SERVER_API_URL}/usuarios`, user);
    }

    edit(user: User): Observable<User> {
        return this.http.put<User>(`${environment.SERVER_API_URL}/usuarios/${user.uid}`, user);
    }

    delete(user: User): Observable<User> {
        return this.http.delete<User>(`${environment.SERVER_API_URL}/usuarios/${user.uid}`);
    }
}
