import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AniversariantesComponent } from './aniversariantes/aniversariantes.component';
import { EmailsComponent } from './emails/emails.component';
import { LetraInicialComponent } from './letra-inicial/letra-inicial.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:id', component: CadastroComponent },
  { path: 'aniversariantes/:id', component: AniversariantesComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'inicial/:caracter', component: LetraInicialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
