import { Component, OnInit } from '@angular/core';
import { ApiYoutubeService } from 'src/app/services/api-youtube/api-youtube.service';
import { TituloAppService } from '../../services/titulo-app.service';

declare var $;
@Component({
  selector: 'app-api-youtube',
  templateUrl: './api-youtube.component.html',
  styleUrls: ['./api-youtube.component.scss'],
})
export class ApiYoutubeComponent  implements OnInit {

  isModalOpen = false;
  videoId: string;
  losVideos: any[]=[];
  constructor( private _youtube: ApiYoutubeService, private tituloAppService: TituloAppService,) {
    this._youtube.obtenerVideos().subscribe((resp:any)=>{
      console.log(resp);
      this.losVideos = resp.items;
    });
    this.tituloAppService.titulo= "Videos de recetas";
  }

  ngOnInit() {}

  verVideo(detalle:string){
    console.log(detalle);
    this.videoId=detalle;
    $('#exampleModal').modal();
  }

  cerrarModal(){
    this.videoId=null;
    $('#exampleModal').modal('hide');
  }

}
