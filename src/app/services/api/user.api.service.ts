import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  usersApi = `${environment.apiSafo}user`;
  userApiToken = `${environment.apiSafo}token`;
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<User>(this.usersApi, user, { headers: header });
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/${id}`);
  }

  Token(id: any): Observable<User> {
    const token = {
      userFire: id,
    };
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<User>(this.userApiToken, token, { headers: header });
  }
}
