import { Routes } from "@angular/router";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { PainelComponent } from "../painel/layout/painel/painel.component";
import { RecuperarSenhaComponent } from "../recuperar-senha/recuperar-senha.component";
import { AuthGuard } from "../auth.guard";
import { PerfilComponent } from "../painel/perfil/perfil.component";
import { Erro404Component } from "../erros/erro404/erro404.component";


export const ROUTES: Routes = [
  // Rotas principais
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },

  // Rotas do painel
  {
    path: 'painel', component: PainelComponent, canActivate: [AuthGuard],
    children: [
      { path: 'perfil', component: PerfilComponent },
    ]
  },

  // Handle all other routes
  { path: '**', component: Erro404Component }
];
