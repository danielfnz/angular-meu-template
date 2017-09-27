import { Component, ViewContainerRef } from '@angular/core';
import { correctHeight, detectBody } from './app.helpers';
import { ToastsManager } from "ng2-toastr";
import { AuthService } from "./services/auth.service";

declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(toastr: ToastsManager, vRef: ViewContainerRef,
  auth: AuthService) {
    toastr.setRootViewContainerRef(vRef);
    auth.chechLogged();
  }
  
  ngAfterViewInit() {
    // Run correctHeight function on load and resize window event
    jQuery(window).bind("load resize", function() {
      correctHeight();
      detectBody();
    });

    // Correct height of wrapper after metisMenu animation.
    jQuery('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300)
    });
  }

}
