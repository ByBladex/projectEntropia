import { VerificationGuard } from './guards/verification.guard';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioServicio } from './servicios/usuario.service';
import { LoginService } from './servicios/login.service';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { SendEmailComponent } from './componentes/send-email/send-email.component';
import { ForgotPasswordComponent } from './componentes/forgot-password/forgot-password.component';
import { LootboxComponent } from './componentes/lootbox/lootbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { TermsOfServiceComponent } from './componentes/terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    TableroComponent,
    SendEmailComponent,
    ForgotPasswordComponent,
    LootboxComponent,
    TermsOfServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    AngularFireModule.initializeApp(environment.firestore, 'projectEntropia'),
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatBadgeModule
  ],
  providers: [LoginService, UsuarioServicio, AuthGuard, VerificationGuard, {provide: SETTINGS, useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
