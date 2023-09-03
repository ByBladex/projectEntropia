import { Pais } from './../../modelo/pais.model';
import { Usuario } from './../../modelo/usuario.model';
import { LoginService } from './../../servicios/login.service';
import { UsuarioServicio } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioActivo: Usuario;
  verificado:boolean;
  
  constructor(private usuarioService: UsuarioServicio, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.verificado = auth.emailVerified;
        this.usuarioService.getUsuario(auth.uid).subscribe( usuario => {
          this.usuarioActivo = usuario;
        });
      }
    }).remove
  }

  guardarValores(){
    
  }

  sumarPuntos(){
    this.usuarioService.actualizarPuntos(this.usuarioActivo, 500);
  }

}
