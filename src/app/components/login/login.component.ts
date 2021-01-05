import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(public cs: ChatService) { }

  ingresar( proveedor: string) {
    console.log(proveedor);
    this.cs.login(proveedor);
  }

}
