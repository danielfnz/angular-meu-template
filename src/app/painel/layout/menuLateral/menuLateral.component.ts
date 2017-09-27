import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from "../../../services/auth.service";

declare var jQuery:any;

@Component({
    selector: 'menuLateral',
    templateUrl: 'menuLateral.template.html'
})

export class NavigationComponent {

    constructor(
        private router: Router,
        public auth: AuthService
    ) {}

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }
    public logout() {
        this.auth.logOut();
    }


}