import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AuthService } from "../../../services/auth.service";
import { FirebaseService } from "../../../services/firebase.service";
declare var jQuery: any;

@Component({
    selector: 'menuTop',
    templateUrl: 'menuTop.template.html',
})
export class TopnavbarComponent  implements OnInit{
    
    ngOnInit(): void {
          this.notificacoes = this.firebase.getNotificacoesAtivasAdvogado();
    }

    public notificacoes;
    constructor(
        public auth: AuthService,
        public firebase: FirebaseService
    ) {

    }

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    public logout() {
        this.auth.logOut();
    }
         

}
