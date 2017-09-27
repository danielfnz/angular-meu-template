import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class FirebaseService {

  public perfil;
  public uid;
  public userData;
  public nomeCompleto;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,

  ) {
    this.afAuth.authState.subscribe(authentication => {
      if (authentication) {
        this.uid = authentication.uid;
        this.db.object('/users/'.concat(authentication.uid)).subscribe(data => {
        this.userData = data;

        });
     }
    });
  }

  //==========================  NOTIFICACOES ==========================

  public getNotificacoesAtivasAdvogado() {
    console.log(this.uid);
    return this.db.list('/users/' + this.uid + '/notificacoes/', {
      query: {
        orderByChild: 'status',
        equalTo: 1
      }
    });
  }
  public getNotificacao(id) {
    return this.db.object('/users/' + this.uid + '/notificacoes/'+id );
  }
  public getNotificacaoUrgente(id) {
    return this.db.list('/notificacoesUrgentes/'+id );
  }

  public aceitarNotificacao(dados) {
    return this.db.object('/users/' + this.uid + '/notificacoes/' + dados.uidNotificacao).update({
      status: 2
    });
  }

  public recusarNotificacao(dados) {
    return this.db.object('/users/' + this.uid + '/notificacoes/' + dados.uidNotificacao).update({
      status: 4
    });
  }  

  //==================== HISTORICO DE ATENDIMENTO =======================

  public getHistoricoAtendimento() {
    console.log(this.uid);
    return this.db.list('/users/' + this.uid + '/notificacoes/', {
      query: {
        orderByChild: 'status',
        equalTo: 2
      }
    });
  }


 //==========================  CORRESPONDENTES ==========================
    public findCorrespondente(cidade) {
    return this.db.list('/users/', {
      query: {
        orderByChild: 'cidade',
        equalTo: cidade
      }
    });
  }

  public findAdvogados(cidade) {
    return this.db.list('/users/', {
      query: {
        orderByChild: 'cidade',
        equalTo: cidade
      }
    });
  }  
}
