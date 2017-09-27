
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

import {NavigationModule} from "../menuLateral/menuLateral.module";
import {TopnavbarModule} from "../menuTop/menuTop.module";
import {FooterModule} from "../footer/footer.module";
import {PainelComponent } from "./painel.component";

@NgModule({
    declarations: [PainelComponent],
    imports     : [BrowserModule, RouterModule, NavigationModule, TopnavbarModule, FooterModule],
    exports     : [PainelComponent]
})

export class PainelModule { }
