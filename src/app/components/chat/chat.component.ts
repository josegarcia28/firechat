import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit{

  public elemento: any;
  mensaje = '';

  constructor( public cs: ChatService) {
    this.cs.cargarMensaje();
  }
  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    // this.cs.cargarMensaje();
    // this.elemento.scrolltop = this.elemento.scrollHeight;
  }
  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    this.cs.agregarMensaje(this.mensaje)
      .then( () => this.mensaje = '')
      .catch( (err) => console.error('Error al enviar', err));
  }

}
