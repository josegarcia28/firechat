import { Injectable } from '@angular/core';
import { Mensaje } from '../interface/mensaje.interface';

// firebase2
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: any[] = [];
  public usuario: any = {};
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe( usu => {
      console.log('Estado del usuario', usu);


      if ( !usu ) {
        return;
      }

      this.usuario.nombre = usu.displayName;
      this.usuario.uid = usu.uid;
    });
  }

  login(proveedor: string) {
    console.log(proveedor);

    switch (proveedor) {
      case 'google':
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter':
        this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        break;
      default:
        console.log('No existe este tipo de autentificacion');
        break;
    }

  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensaje() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5));
    return this.itemsCollection.valueChanges().subscribe( (resp: Mensaje[]) => {
      this.chats = [];
      for ( const conte of resp ) {
        this.chats.unshift( conte );
      }
      console.log(this.chats);
      return this.chats;
    });
  }

  agregarMensaje(texto: string) {
    // TODO falta UID
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );
  }

}
