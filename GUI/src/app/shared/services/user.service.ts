// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rx
import { Observable } from 'rxjs';

// Project
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPermissions$(): Observable<User> {
    return this.http.get<User>(`${environment.SERVER_API_URL}/usuarios`);
  }
}