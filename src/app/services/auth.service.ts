import { Injectable, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FirebaseService } from "./firebase.service";


@Injectable()
export class AuthService {

  public userData;
  public currentUserId;
  public currentUserName;
  public currentUserEmail;
  public logado;
  public Naologado;

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public router: Router,
    private db: AngularFireDatabase,
    public toastr: ToastsManager,
  ) {
    this.chechLogged();
  }
  public chechLogged() {
    this.afAuth.authState.subscribe(authentication => {
      if (authentication) {
        this.logado = true;
        this.currentUserId = authentication.uid;
        this.currentUserEmail = authentication.email;
        this.currentUserName = authentication.displayName
        this.afDatabase.object('/users/'.concat(authentication.uid)).subscribe(data => {
          this.userData = data;

          authentication.updateProfile({
            displayName: data.nomeCompleto,
            photoURL: authentication.photoURL
          });
        });
      }
      else {
        this.Naologado = true;
      }
    });
  }

  public loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => this._successLoginSocial(data))
      .catch((err) => this._errorSocial(err));
  }

  public loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data) => this._successLoginSocial(data))
      .catch((err) => this._errorSocial(err));
  }

  public loginEmailSenha(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.senha)
      .then((data) => this._successLogin(data))
      .catch((err) => this._error(err));
  }

  private _successLogin(user) {
    this.chechLogged();
    this.toastr.success("Bem vindo ao AdvogAqui!", "Login efetuado com sucesso!", {
      "dismiss": 'auto',
      "debug": false,
      "progressBar": true,
      "preventDuplicates": false,
      "positionClass": "toast-top-right",
      "showCloseButton": true,
      "showDuration": "400",
      "hideDuration": "1000",
      "toastLife": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });
    this.router.navigate(['/painel']);
  }

  private _successLoginSocial(user) {
    this.chechLogged();
    this.toastr.success("Bem vindo ao AdvogAqui!", "Login efetuado com sucesso!", {
      "dismiss": 'auto',
      "debug": false,
      "progressBar": true,
      "preventDuplicates": false,
      "positionClass": "toast-top-right",
      "showCloseButton": true,
      "showDuration": "400",
      "hideDuration": "1000",
      "toastLife": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });

    this.router.navigate(['/painel']);
    return this.db.object(`/users/${user.user.uid}`).update({
      uid: user.user.uid,
      nomeCompleto: user.user.displayName,
      email: user.user.email,
      photoURL: user.user.photoURL,
      perfil: 2
    });
  }

  public createUserLoginSenha(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha)
      .then((data) => this._successCadastro(data, user))
      .catch((err) => this._error(err));
  }

  public createUserFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data) => this._successCadastroSocial(data))
      .catch((err) => this._errorSocial(err));
  }

  public createUserGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => this._successCadastroSocial(data))
      .catch((err) => this._errorSocial(err));
  }

  private _successCadastro(data, user) {
    this.chechLogged();
    this.toastr.success("Bem vindo ao AdvogAqui!", "Cadastro efetuado com sucesso!", {
      "dismiss": 'auto',
      "debug": false,
      "progressBar": true,
      "preventDuplicates": false,
      "positionClass": "toast-top-right",
      "showCloseButton": true,
      "showDuration": "400",
      "hideDuration": "1000",
      "toastLife": "7000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });

    this.router.navigate(['/painel']);
    console.log("cadastro",data);

    return this.db.object(`/users/${data.uid}`).update({
      uid: data.uid,
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      perfil: user.perfil,
      photoURL: 'assets/icon/semfoto.png',
      ddd: user.ddd,
      celular: user.celular,
      estado: user.estado,
      cidade: user.cidade
    });
  }

  private _successCadastroSocial(user) {
    this.chechLogged();
    console.log(user);
    this.toastr.success("Bem vindo ao AdvogAqui!", "Cadastro efetuado com sucesso!", {
      "dismiss": 'auto',
      "debug": false,
      "progressBar": true,
      "preventDuplicates": false,
      "positionClass": "toast-top-right",
      "showCloseButton": true,
      "showDuration": "400",
      "hideDuration": "1000",
      "toastLife": "7000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });

    this.router.navigate(['/painel']);

    return this.db.object(`/users/${user.user.uid}`).update({
      uid: user.user.uid,
      nomeCompleto: user.user.displayName,
      email: user.user.email,
      photoURL: user.user.photoURL,
      perfil: 2
    });
  }

  recuperarSenha(email) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(sucesso => {
      this.toastr.success("Foi enviado um email para realizar a recuperação da senha.", "Confira seu email!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });

      this.router.navigate(['']);

    }).catch((err) => this._error(err));
  }

  /*-------------------MENSAGENS DE ERRO ----------------------------------------*/
  private _error(err) {
    if (err.code == "auth/user-not-found") {
      this.toastr.error("Ops!", "Usuário não encontrado, tente novamente!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    if (err.code == "auth/wrong-password") {
      this.toastr.error("Senha incorreta!", "Sua senha está incorreta, tente novamente!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }

    if (err.code == "auth/email-already-in-use") {
      this.toastr.error("Endereço de e-mail em uso!", "O endereço de e-mail já está em uso, você ja tem cadastro?", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    if (err.code == "auth/account-exists-with-different-credential") {
      this.toastr.error("Ops, você utilizou outra forma de login ao se cadastrar", "Tente connectar-se com o Facebook ou Google", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/weak-password") {
      this.toastr.warning("Senha Fraca!", "A senha deve ter pelo menos 6 digitos!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/invalid-email") {
      this.toastr.error("Email invalido!", "O formato do e-mail está invalido.", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/network-request-failed") {
      this.toastr.error("Sem conexão a internet!", "Tente novamente em alguns instantes.", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    console.log(err);
  }

  private _errorSocial(err) {
    if (err.code == "auth/user-not-found") {
      this.toastr.error("Ops!", "Usuário não encontrado, tente novamente!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    if (err.code == "auth/wrong-password") {
      this.toastr.error("Senha incorreta!", "Sua senha está incorreta, tente novamente!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }

    if (err.code == "auth/email-already-in-use") {
      this.toastr.error("Endereço de e-mail em uso!", "O endereço de e-mail já está em uso, você ja tem cadastro?", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    if (err.code == "auth/account-exists-with-different-credential") {
      this.toastr.error("Ops, você utilizou outra forma de login ao se cadastrar", "Tente connectar-se com o seu EMAIL e SENHA", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/weak-password") {
      this.toastr.warning("Senha Fraca!", "A senha deve ter pelo menos 6 digitos!", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/invalid-email") {
      this.toastr.error("Email invalido!", "O formato do e-mail está invalido.", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    else if (err.code == "auth/network-request-failed") {
      this.toastr.error("Sem conexão a internet!", "Tente novamente em alguns instantes.", {
        "dismiss": 'auto',
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "showCloseButton": true,
        "showDuration": "400",
        "hideDuration": "1000",
        "toastLife": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }
    console.log(err);
  }

  public logOut() {
    return this.afAuth.auth.signOut()
      .then((res) => {
        this.logado = false;
        this.router.navigate(['/']);

        this.toastr.success("Você saiu do AdvogAqui", "Logout efetuado com sucesso!", {
          "dismiss": 'auto',
          "debug": false,
          "progressBar": true,
          "preventDuplicates": false,
          "positionClass": "toast-top-right",
          "showDuration": "400",
          "hideDuration": "1000",
          "toastLife": "1000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        });

      }).then((res) => {
        return Promise.resolve("Logout user has been succed");
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
}
