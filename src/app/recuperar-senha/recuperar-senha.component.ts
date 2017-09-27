import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

declare var jQuery: any;
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

    public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService

  ) { 
      this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
  }

  ngOnInit() {
  }

  doRecuperar(){
    this.AuthService.recuperarSenha(this.formulario.get('email').value);
  }
}
