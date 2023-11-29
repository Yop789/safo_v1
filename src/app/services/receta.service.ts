import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  usersApi = `${environment.apiSafo}reset`;

  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe): Observable <Recipe> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Recipe>(this.usersApi,recipe, { headers: headers });
  }

}



