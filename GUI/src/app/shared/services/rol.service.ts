// Angular
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Rx
import {Observable} from 'rxjs';

// Role
import {environment} from 'src/environments/environment';
import {Rol} from '../models/rol';

export type ENTITY_LIST_RESPONSE = {
  "total": Number,
  "roles": Rol[]
}

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<ENTITY_LIST_RESPONSE> {
    return this.http.get<ENTITY_LIST_RESPONSE>(`${environment.SERVER_API_URL}/roles`);
  }
}
