import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTES} from "./rotas/app.routes";
import { AppComponent } from './app.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// App views

//Services
import { AuthService } from "./services/auth.service";
import { FirebaseService } from "./services/firebase.service";

//Guards
import { AuthGuard } from "./auth.guard";

// App modules/components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PainelModule } from "./painel/layout/painel/painel.module";
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { PerfilComponent } from './painel/perfil/perfil.component';
import { Erro404Component } from './erros/erro404/erro404.component';

export const environment = {
  production: false,

};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
     PerfilComponent,
    Erro404Component,
    ],
    imports: [
    // Angular modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ToastModule.forRoot(),

    // Modules
    PainelModule,

    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    //Maps
    AgmCoreModule.forRoot({
      apiKey: 'xxxxxxxxxxxxxxxxxx',
      libraries: ['places']
    }),
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    FirebaseService,
    
    //Guards
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
