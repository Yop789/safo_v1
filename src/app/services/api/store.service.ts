import { Qualification } from './../../models/qualification';
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
  private urlPag = `${environment.apiSafo}storep`;
  private storqual = `${environment.apiSafo}storequal`;
  private storeLike = `${environment.apiSafo}storeLikes`;
  private storePagFilter = `${environment.apiSafo}storeSeach`;
  private storeFavorite = `${environment.apiSafo}storeLiqueUser/idUser=`;
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
  getStoreByID(id: string): Observable<Store> {
    return this.http.get<Store>(this.url1 + '/' + id);
  }
  updateStore(id: string, store: any): Observable<Store> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.put<Store>(this.url1 + '/' + id, store, {
      headers: header,
    });
  }
  createQualification(
    id: string,
    qualification: Qualification
  ): Observable<any> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post(`${this.storqual}/${id}`, qualification, {
      headers: header,
    });
  }
  getQualification(id: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${this.storqual}/${id}`);
  }

  deleteQualification(id: string, idQual: string): Observable<any> {
    const data = {
      _id: idQual,
    };

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(`${this.storqual}/${id}`, {
      headers,
      body: data,
    });
  }
  getStorePorPagincion(page: number, pageSize: number) {
    return this.http.get<Store[]>(`${this.urlPag}/${page}/${pageSize}`);
  }
  likeStore(idStore: string, idUser: string): Observable<Store> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<Store>(
      `${this.storeLike}/idStore=${idStore}/idUser=${idUser}`,
      { headers: header }
    );
  }
  getFilterPageStore(page: number, search: any) {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<any[]>(
      `${this.storePagFilter}/page=${page}/pageSize=2/searchTerm=${search}`,
      { headers: header }
    );
  }
  getStoreFavoritByUser() {
    const user: User = this.tokenService.decodeToken();
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<any[]>(`${this.storeFavorite}${user._id}`, {
      headers: header,
    });
  }
}
