import { Usuario } from 'src/app/modelo/usuario.model';
import { Timestamp } from '@firebase/firestore';
import { LoginService } from './../../servicios/login.service';
import { UsuarioServicio } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-lootbox',
  templateUrl: './lootbox.component.html',
  styleUrls: ['./lootbox.component.css']
})
export class LootboxComponent implements OnInit {

  habilitado: boolean = false;
  usuarioActivo: Usuario;
  diferenciaHorariaSegundos:number;
  diferenciaHorariaMinutos:number;
  diferenciaHorariaHoras:number;
  constructor(private usuarioService: UsuarioServicio, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.usuarioService.getUsuario(auth.uid).subscribe( usuario => {
          this.usuarioActivo = usuario;
          if(this.usuarioActivo.tiempoRecompensaDiaria.seconds > Timestamp.now().seconds){
            this.diferenciaHorariaSegundos = Math.round((usuario.tiempoRecompensaDiaria.seconds - Timestamp.now().seconds))%60;
            this.diferenciaHorariaMinutos = Math.round((usuario.tiempoRecompensaDiaria.seconds - Timestamp.now().seconds)/60)%60;
            this.diferenciaHorariaHoras = Math.round((usuario.tiempoRecompensaDiaria.seconds - Timestamp.now().seconds)/3600)%24;
          }
          else{
            this.diferenciaHorariaHoras=0;
            this.diferenciaHorariaMinutos=0;
            this.diferenciaHorariaSegundos=0;
          }

          this.comprobarRecompensaDiaria();
        });
      }
    }).remove
  }

  compararTimestamps(){
    timer(1000, 1000).subscribe(() => {
      var end = this.usuarioActivo.tiempoRecompensaDiaria.toDate().getTime();
      var current = new Date().getTime(); //Current timestamp
      var seconds_left = (end - current) / 1000;
  
      // do some time calculations
      var days = Math.round(seconds_left / 86400);
      seconds_left = seconds_left % 86400;
  
      var hours = Math.round(seconds_left / 3600);
      seconds_left = seconds_left % 3600;
  
      var minutes = Math.round(seconds_left / 60);
      var seconds = Math.round(seconds_left % 60);
  
      console.log(days + "d, " + hours + "h,"+ minutes + "m, " + seconds + "s");  
    });
  }

  comprobarRecompensaDiaria(){
    if(this.usuarioActivo.tiempoRecompensaDiaria.seconds <= Timestamp.now().seconds){
      this.habilitado = true;
      console.log("Se puede abrir");
    }
    else{
      this.habilitado = false;
      console.log("No se puede abrir");
    }
  }

  recogerRecompensaDiaria(){
    this.loginService.getAuth().subscribe(auth => {
      let puntos = Math.round(Math.random() * (100 - 10) + 10);
      this.usuarioService.actualizarDateRecompensaDiaria(auth.uid);
      this.usuarioService.actualizarPuntos(this.usuarioActivo, puntos);
    }).remove
  }

  /*timerBox(){
    timer(1000, 1000).subscribe(() => {
      if(this.progressTime < this.progressTimeMax){
        this.progressTime++;
        this.habilitado = false;
        console.log(this.progressTime);
      }
      else if(this.progressTime === this.progressTimeMax)
        this.habilitado = true;
    });
  }*/
}
