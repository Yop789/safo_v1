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

  constructor(private http: HttpClient) {}

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
}
