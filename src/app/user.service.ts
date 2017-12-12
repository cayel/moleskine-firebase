import { AppUser } from './models/app-user';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    console.log(user);
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      lastConnection: new Date()
    });
  }
  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
