import { TokenService } from './token/token.service';
import { User } from './../models/user';
import { HeaderComponent } from './../home/header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { Qualification } from '../models/qualification';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  usersApi = `${environment.apiSafo}reset`;
  comenRecipeApi = `${environment.apiSafo}resetqual`;
  resetRandom = `${environment.apiSafo}resetRandom`;
  resetPag = `${environment.apiSafo}resetsP`;
  resetLike = `${environment.apiSafo}resetLikes`;
  resetPagFilter = `${environment.apiSafo}resetSeach`;
  resetFavorite = `${environment.apiSafo}resetLiqueUser/idUser=`;
  resetByUserId = `${environment.apiSafo}resetUser`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createRecipe(recipe: any): Observable<Recipe> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Recipe>(this.usersApi, recipe, { headers: header });
  }

  getRecipe(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.usersApi);
  }
  getRecipeById(id: any): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.usersApi}/${id}`);
  }
  getRecipeByUserId(): Observable<Recipe[]> {
    const user: User = this.tokenService.decodeToken();
    return this.http.get<Recipe[]>(`${this.resetByUserId}/${user._id}`);
  }
  deleteRecipeById(id: any): Observable<any> {
    return this.http.delete(`${this.usersApi}/${id}`);
  }
  updateRecipe(recipe: any, id: any): Observable<Recipe> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.put<Recipe>(`${this.usersApi}/${id}`, recipe, {
      headers: header,
    });
  }

  createQualification(
    id: string,
    qualification: Qualification
  ): Observable<any> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post(`${this.comenRecipeApi}/${id}`, qualification, {
      headers: header,
    });
  }
  getQualification(id: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${this.comenRecipeApi}/${id}`);
  }

  deleteQualification(id: string, idQual: string): Observable<any> {
    const data = {
      _id: idQual,
    };

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(`${this.comenRecipeApi}/${id}`, {
      headers,
      body: data,
    });
  }
  getResetRandom(): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.resetRandom}`);
  }
  getRecetaPorPagincion(page: number, pageSize: number) {
    return this.http.get<Recipe[]>(`${this.resetPag}/${page}/${pageSize}`);
  }
  likeReset(idStore: string, idUser: string): Observable<Recipe> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<Recipe>(
      `${this.resetLike}/idReset=${idStore}/idUser=${idUser}`,
      { headers: header }
    );
  }
  getFilterPageReset(page: number, search: any) {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<Recipe[]>(
      `${this.resetPagFilter}/page=${page}/pageSize=2/searchTerm=${search}`,
      { headers: header }
    );
  }
  getResetFavoritByUser() {
    const user: User = this.tokenService.decodeToken();
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<any[]>(`${this.resetFavorite}${user._id}`, {
      headers: header,
    });
  }
}
