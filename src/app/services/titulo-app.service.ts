import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TituloAppService {
  private _titulo = new BehaviorSubject<string>('Inicio');
  public titulo$ = this._titulo.asObservable();

  public get titulo(): string {
    return this._titulo.getValue();
  }

  public set titulo(value: string) {
    this._titulo.next(value);
  }
}
