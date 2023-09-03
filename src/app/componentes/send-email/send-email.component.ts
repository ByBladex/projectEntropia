import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public user$: Observable<any> = this.loginService.authService.user;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth && auth.emailVerified){
        this.router.navigate(['/']);
      }
    })
  }

  sendVerification(){
    this.loginService.sendVerificationEmail();
  }
}
