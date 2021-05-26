import { UserModel } from './../models/user.model';
import { ChatMessageModel } from './../models/chat-message.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatMessages: Observable<ChatMessageModel[]>;
  chatMessage: ChatMessageModel;
  username: string;
  user: firebase.User;
  toggle = new Subject<boolean>();
  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe((a) => {
        this.username = a.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user != null ? this.user.uid : '';
    const path = `user/${userId}`;
    return this.db.object<UserModel>(path).valueChanges();
  }

  getUsers() {
    const path = 'user';
    return this.db
      .list<UserModel>(path)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.val();
            const id = a.payload.key;
            return { uid: id, ...data };
          })
        )
      );
  }

  sendMessage(message: string, receiverId: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    const senderId = this.user.uid;
    this.db.list<ChatMessageModel>('messages').push({
      message: message,
      timeSent: timeStamp,
      username: this.username,
      email: email,
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  getMessages(receiverId: string): Observable<ChatMessageModel[]> {
    return this.db
      .object<UserModel>(`user/${this.user.uid}`)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.val();
          const id = a.payload.key;
          return { uid: id, ...data };
        }),
        mergeMap((sender) => {
          return this.db
            .object<UserModel>(`user/${receiverId}`)
            .snapshotChanges()
            .pipe(
              map((a) => {
                const data = a.payload.val();
                const id = a.payload.key;
                return { uid: id, ...data };
              }),
              mergeMap((receiver) => {
                return this.db
                  .list<ChatMessageModel>('messages', (ref) =>
                    ref.limitToLast(25).orderByKey()
                  )
                  .snapshotChanges()
                  .pipe(
                    map((actions) =>
                      actions
                        .map((a) => {
                          const data = a.payload.val();
                          const id = a.payload.key;
                          return { id, ...data };
                        })
                        .filter(
                          (a) =>
                            (this.user.uid === a.senderId &&
                              receiverId === a.receiverId) ||
                            (this.user.uid === a.receiverId &&
                              receiverId === a.senderId)
                        )
                        .map((a) => {
                          if (sender.uid === a.senderId) {
                            a.username = sender.displayName;
                          } else {
                            a.username = receiver.displayName;
                          }
                          return a;
                        })
                    )
                  );
              })
            );
        })
      );
  }

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      '/' +
      (now.getUTCMonth() + 1) +
      '/' +
      now.getUTCDate();

    const time =
      now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
