import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  formEmail: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
    this.formEmail = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email])
    });
  }

  async resetPassword(){
    const email = this.formEmail.controls.email.value;
    this.loginService.resetPassword(email).then(res => {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);  //4s
      this.flashMessages.show('Email de recuperación de contraseña enviado. Redirigiendo a Login...', {
        cssClass: 'alert-success', timeout:4000
      })
    }).catch(err => {
      this.flashMessages.show('No se encontró el email proporcionado', {
        cssClass: 'alert-danger', timeout:4000 
      })
    })
  }
}
