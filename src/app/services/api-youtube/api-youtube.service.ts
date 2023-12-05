import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import {map} from rxjs/operators;

@Injectable({
  providedIn: 'root'
})
export class ApiYoutubeService {

  private url: string="https://www.googleapis.com/youtube/v3";
  private api_key:string = "AIzaSyBWmiEYs9YuasjwBxAycLm4Fvnj4qKok9M";
  private canal:string = "UCQ5ViDOVpLdOUByAcH4Mi6g";
  constructor(private _http:HttpClient) { }

  obtenerVideos(){
    const parametros= new HttpParams().set('part','snippet').set('channelId',this.canal).set('maxResults','10').set('key',this.api_key);
    let vinculo= `${this.url}/search`;
    return this._http.get(vinculo,{params:parametros}).pipe(map(resp=>resp));
  }

}
