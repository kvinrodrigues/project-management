// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rx
import { Observable } from 'rxjs';

// Project
import { environment } from 'src/environments/environment';
import { Permissions } from '../models/permissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  getPermissions$(): Observable<Permissions> {
    return this.http.get<Permissions>(`${environment.SERVER_API_URL}/permisos`);
  }
}
