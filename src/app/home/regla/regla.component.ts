import { TituloAppService } from 'src/app/services/titulo-app.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.scss'],
})
export class ReglaComponent implements OnInit {
  constructor(private tituloAppService: TituloAppService) {}

  ngOnInit() {
    this.tituloAppService.titulo = 'Reglas';
  }
}
