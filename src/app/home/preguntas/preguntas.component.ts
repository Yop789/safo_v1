import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent {

    preguntas = [
    { pregunta: '¿Cómo encuentro recetas específicas en la página?',
      respuesta: 'Las recetas se pueden encontrar mediante el buscador ', mostrarRespuesta: false },
    { pregunta: '¿Se pueden añadir a favoritos las recetas?',
      respuesta: 'Si tenemos la función de añadir favorito del lado', mostrarRespuesta: false },
    { pregunta: '¿Es necesario registrarse para acceder a las recetas?',
      respuesta: 'No, pero si quieres publicar algunas recetas en conveniente registrarte', mostrarRespuesta: false },
    { pregunta: '¿Ofreces tutoriales o videos para las recetas? ¿Dónde los encuentro?',
      respuesta: 'Ofrecemos el espacio de videos de cocina', mostrarRespuesta: false },
    { pregunta: '¿Puedo sugerir nuevas recetas?',
      respuesta: 'Si al registrate puedes agregar recetas para compartirlas con los demas', mostrarRespuesta: false },
    { pregunta: '¿Ofreces opciones para crear listas de compras basadas en las recetas?',
      respuesta: 'No, solo somos publicitarios de dichas tiendas', mostrarRespuesta: false },
    { pregunta: '¿Se pueden comentar las recetas o dejar reseñas?',
      respuesta: 'Solo puedes dar clic en las estrellitas para poder calificar', mostrarRespuesta: false },
    ];

    toggleRespuesta(pregunta: { mostrarRespuesta: boolean; }) {
      pregunta.mostrarRespuesta = !pregunta.mostrarRespuesta;
    }


}
