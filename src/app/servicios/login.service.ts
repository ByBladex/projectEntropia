import { GoogleAuthProvider } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public authService: AngularFireAuth) { }

  async resetPassword(email:string){
    return new Promise((resolve, reject) => {
      this.authService.sendPasswordResetEmail(email).then(datos => resolve(datos), error => reject(error));
    })
  }

  async sendVerificationEmail():Promise<void>{
    return (await this.authService.currentUser).sendEmailVerification();
  }

  async loginGoogle(){
    return new Promise((resolve, reject) => {
      this.authService.signInWithPopup(new GoogleAuthProvider()).then(datos => resolve(datos), error => reject(error));
    })
  }

  async login(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email,password).then(datos => resolve(datos), error => reject(error));
    })
  }

  async registrarse(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email,password).then(datos => {
        resolve(datos);
        this.sendVerificationEmail();
      }, error => reject(error));
    })      

  }

  getAuth(){
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }

  logout(){
    this.authService.signOut();
  }
}
