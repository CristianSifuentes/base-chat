import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat-message.model';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ChatService {
  user: any;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {

    /*this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });*/
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    /*const email = this.user.email;*/
    const email = 'test@example.com';
    this.chatMessages = this.getMessage();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      /*userName: this.userName,*/
      userName: 'test-user',
      email: email
    });
    console.log('in sendMessage');

  }

  getMessage(): FirebaseListObservable<ChatMessage[]> {
    //Query to create list
    return this.db.list('messages', {
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours + ':' +
      now.getUTCMinutes + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }

}
