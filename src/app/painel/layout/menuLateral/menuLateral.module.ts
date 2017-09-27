import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {NavigationComponent} from "./menuLateral.component";

@NgModule({
    declarations: [NavigationComponent],
    imports     : [BrowserModule, RouterModule],
    exports     : [NavigationComponent],
})

export class NavigationModule {}