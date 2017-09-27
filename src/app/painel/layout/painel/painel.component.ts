import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
})
export class PainelComponent implements OnInit {

  constructor(
    private router: Router,
    private authProvider: AuthService
  ) {
   }

  ngOnInit() {
      /* if (this.authProvider.userData.perfil == 1 ) {
        this.router.navigate(['/painel/advogado/dashboard']);
      }
      if (this.authProvider.userData.perfil == 2 ) {
        this.router.navigate(['/painel/cliente/encontraradvogado']);
      }
      if (this.authProvider.userData.perfil == 3 ) {
        this.router.navigate(['/painel/colunista/dashboard']);
      }
      if (this.authProvider.userData.perfil == 666 ) {
        this.router.navigate(['/painel/adminstrador/dashboard']);
      }
      if (this.authProvider.userData.perfil == 777 ) {
        this.router.navigate(['/painel/programador/dashboard']);
      } */
  }

}
