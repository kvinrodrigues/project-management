// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rx
import { Observable } from 'rxjs';

// Project
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}

  getPermissions$(): Observable<Rol> {
    return this.http.get<Rol>(`${environment.SERVER_API_URL}/roles`);
  }
}