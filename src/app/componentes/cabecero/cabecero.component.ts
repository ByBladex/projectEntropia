import { UsuarioServicio } from './../../servicios/usuario.service';
import { Router } from '@angular/router';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean; //si el usuario está logeado o no
  userId: string; //id del usuario autenticado
  loggedInUser: string; //user del usuario autenticado
  puntos: number; //puntos del usuario autenticado
  image: string='';
  

  constructor(private loginService: LoginService, private router: Router, private usuarioService: UsuarioServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.userId = auth.uid;
        this.usuarioService.getUsuario(this.userId).subscribe(user => {
          if(user){
            this.loggedInUser = user.usuario;
            this.puntos = user.puntos;
            this.image = user.image;
          }
        })
      }
      else{
        this.isLoggedIn = false;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
