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
  constructor(private http: HttpClient) {}

  createStore(store: any): Observable<Store> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Store>(this.url1, store, { headers: header });
  }
}
