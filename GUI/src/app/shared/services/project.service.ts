// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Project
import {environment} from 'src/environments/environment';
import {Project} from '../models/project';
import {map} from "rxjs/operators";

export type ENTITY_LIST_RESPONSE = {
    "total": Number,
    "proyectos": Project[]
}

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<ENTITY_LIST_RESPONSE> {
        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/proyectos`);
    }

    find(uid: string): Observable<Project> {
        const params = new HttpParams().append('uid', uid);

        return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/proyectos`, {params})
            .pipe(
                map(value => value.proyectos[0])
            );
    }

    create(project: Project): Observable<Project> {
        return this.http.post<Project>(`${environment.SERVER_API_URL}/proyectos`, project);
    }

    edit(project: Project): Observable<Project> {
        return this.http.put<Project>(`${environment.SERVER_API_URL}/proyectos/${project.uid}`, project);
    }

    delete(project: Project): Observable<Project> {
        return this.http.delete<Project>(`${environment.SERVER_API_URL}/proyectos/${project.uid}`);
    }
}

