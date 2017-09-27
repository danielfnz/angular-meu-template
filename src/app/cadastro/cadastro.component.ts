import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

declare var jQuery: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,

  ) {

    //Valida o formulario de login
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required, Validators.maxLength(60)])],
      nomeCompleto: ['', Validators.compose([Validators.minLength(3), Validators.required, Validators.maxLength(60)])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.required, Validators.maxLength(30)])],
      celular: ['', Validators.required],
      ddd: ['', Validators.required],
      estado: [''],
      cidade: [''],
      perfil: ['', Validators.required],

    });

   }
  
  ngOnInit() {
  }

  doCadastro(){
    this.auth.createUserLoginSenha(this.formulario.value);
  }

}
