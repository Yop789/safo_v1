import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TituloAppService {
  private _titulo = new BehaviorSubject<string>('');
  public titulo$ = this._titulo.asObservable();

  public titulos: string[] = [];

  public get titulo(): string {
    return this._titulo.getValue();
  }

  public set titulo(value: string) {
    if (value === 'Inicio') {
      // Limpiar el array solo si el nuevo título es "Inicio"
      this.titulos = [value];
      this._titulo.next(value);
    } else if (!this.titulos.includes(value)) {
      this.titulos.push(value);
      this._titulo.next(value);
    }
  }

  public back() {
    if (this.titulos.length > 1) {
      this.titulos.pop();
      let ultimoTitulo = this.titulos[this.titulos.length - 1];
      this._titulo.next(ultimoTitulo);
    }
  }
}
