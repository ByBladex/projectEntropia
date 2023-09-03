import { Timestamp } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from "@angular/core";
import { Usuario } from '../modelo/usuario.model';
import { map } from 'rxjs/operators';
import { Pais } from '../modelo/pais.model';

@Injectable()
export class UsuarioServicio{

    usuarioCollection: AngularFirestoreCollection<Usuario>;
    countriesCollection: AngularFirestoreCollection<Pais>;
    usuarioDoc: AngularFirestoreDocument<Usuario>;
    countriesDoc: AngularFirestoreDocument<Pais[]>;
    usuario: Observable<Usuario>;
    countries: Observable<Pais[]>;
    puntos:number;

    constructor(private db: AngularFirestore){
      this.usuarioCollection = db.collection('usuarios');
      this.countriesCollection = db.collection<Pais>('countries');
      this.puntos = 0;
    }

    ngOnInit(): void {
  
    }

    userExist(id:string){
      return (this.db.firestore.doc(`usuarios/${id}`).get())
    }

    getCountries(){
      return this.db.doc<Pais[]>('countries/countries').get();
    }

    getUsuario(id:string){
        this.usuarioDoc = this.db.doc<Usuario>(`usuarios/${id}`);
        this.usuario = this.usuarioDoc.snapshotChanges().pipe(
          map(accion => {
            if(accion.payload.exists === false){
              return null;
            }
            else{
              const datos = accion.payload.data() as Usuario;
              datos.id = accion.payload.id;
              return datos;
            }
          })
        );
        return this.usuario;
    }

    registrarUsuarioDB(usuario: Usuario){
      this.usuarioCollection.doc(usuario.id).set(usuario);
      console.log("Usuario registrado: "+usuario.id, usuario.email);
    }

    actualizarUltimaSesion(id: string){
      this.usuarioCollection.doc(id).update({ultimaSesion: Timestamp.now()}).then(() => console.log("Ultima sesion de usuario actualizada")).catch(err => console.log(err));    
    }

    actualizarDateRecompensaDiaria(id: string){
      let fechaSiguiente = new Timestamp(Timestamp.now().seconds+14400, 0);
      this.usuarioCollection.doc(id).update({tiempoRecompensaDiaria: fechaSiguiente}).then(() => console.log("Fecha de recompensa diaria actualizada")).catch(err => console.log(err));    
    }    
    actualizarPuntos(usuario: Usuario, cantidad:number){
      this.usuarioCollection.doc(usuario.id).update({puntos: usuario.puntos+cantidad}).then(() => console.log("Puntos actualizados")).catch(err => console.log(err));    
    }
}