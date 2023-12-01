import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  publiApi = `${environment.apiSafo}advertisement`;
  publiUserApo = `${environment.apiSafo}advertisementIUser/`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createPublicidad(p: any): Observable<any> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<any>(this.publiApi, p, { headers: header });
  }
  getPublicidadByUser(): Observable<any> {
    const user: User = this.tokenService.decodeToken();
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<any>(this.publiUserApo + user._id, {
      headers: header,
    });
  }
  deletePublicidad(id: string): Observable<any> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.delete<any>(this.publiApi + '/' + id, {
      headers: header,
    });
  }
}
