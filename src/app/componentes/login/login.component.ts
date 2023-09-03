import { Timestamp } from '@firebase/firestore';
import { Usuario } from './../../modelo/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioServicio } from './../../servicios/usuario.service';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario={};

  loginForm: FormGroup;
  constructor(private router: Router, private flashMessages: FlashMessagesService, private loginService: LoginService, private usuarioService: UsuarioServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
    this.loginForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)])
    });
  }

   loginGoogle(){
    this.loginService.loginGoogle().then(res => {
      this.loginService.getAuth().subscribe(auth => {
        if(auth){
          this.usuarioService.userExist(auth.uid).then(data => {
            if(data.exists){
              this.usuarioService.actualizarUltimaSesion(auth.uid);
            }
            else{
              this.usuario.id = auth.uid;
              this.usuario.email = auth.email;
              this.usuario.fechaRegistro = Timestamp.now();
              this.usuario.ultimaSesion = Timestamp.now();
              this.usuario.tiempoRecompensaDiaria = Timestamp.now();
              this.usuario.puntos = 0;
              this.usuario.image = auth.photoURL.toString();
              this.usuario.usuario = auth.displayName.toString();
              this.usuario.pais = '';
              this.usuarioService.registrarUsuarioDB(this.usuario);
            }
          })
        }
      }).remove
    });
  }
  
  login(){
    if(this.loginForm.controls.email.invalid || this.loginForm.controls.password.invalid){
      this.flashMessages.show('Debes rellenar todos los campos para iniciar sesion', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      this.loginService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(res => {
        this.loginService.getAuth().subscribe(auth => {
          if(auth && auth.emailVerified){
            this.router.navigate(['/']);
            this.usuarioService.actualizarUltimaSesion(auth.uid);
          }
          else if(auth){
            this.usuarioService.actualizarUltimaSesion(auth.uid);
          }
        }).remove;
      }).catch(err => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger', timeout:4000 
        })
      });
    }
  }

}
