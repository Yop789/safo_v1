import { User } from './../../models/user';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from './../../models/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private url1 = `${environment.apiSafo}store`;
  private url2 = `${environment.apiSafo}storeUser/`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createStore(store: any): Observable<Store> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Store>(this.url1, store, { headers: header });
  }
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.url1);
  }
  getStoreByIdUser(): Observable<Store[]> {
    const user: User = this.tokenService.decodeToken();

    return this.http.get<Store[]>(this.url2 + user._id);
  }
  deleteStoreByID(id: string): Observable<Store> {
    return this.http.delete<Store>(this.url1 + '/' + id);
  }
}
