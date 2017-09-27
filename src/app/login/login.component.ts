import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,

  ) {

    //Valida o formulario de login
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.required],
    });

  }

  doLogin() {
    this.auth.loginEmailSenha(this.formulario.value);
  }

  doLoginFacebook() {
    this.auth.loginFacebook();
  }
  doLoginGoogle() {
    this.auth.loginGoogle();
  }

  ngOnInit() {
  }

}
