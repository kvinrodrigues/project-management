// Angular
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {User} from '../models/user';

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

    getUsers(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/usuarios`);
    }

    edit(user: User): Observable<User> {
        return this.http.put<User>(`${environment.SERVER_API_URL}/usuarios/${user.uid}`, user);
    }

    delete(user: User): Observable<User> {
        return this.http.delete<User>(`${environment.SERVER_API_URL}/usuarios/${user.uid}`);
    }
}
