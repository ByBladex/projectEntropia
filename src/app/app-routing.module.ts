import { TermsOfServiceComponent } from './componentes/terms-of-service/terms-of-service.component';
import { LootboxComponent } from './componentes/lootbox/lootbox.component';
import { ForgotPasswordComponent } from './componentes/forgot-password/forgot-password.component';
import { VerificationGuard } from './guards/verification.guard';
import { SendEmailComponent } from './componentes/send-email/send-email.component';
import { AuthGuard } from './guards/auth.guard';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: TableroComponent},
  {path: 'lootbox', component: LootboxComponent, canActivate: [AuthGuard, VerificationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistroComponent},
  {path: 'verification', component: SendEmailComponent, canActivate: [AuthGuard]},
  {path: 'terms', component: TermsOfServiceComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'profile', component: PerfilComponent, canActivate: [AuthGuard, VerificationGuard]},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
