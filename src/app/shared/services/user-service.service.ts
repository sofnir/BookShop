import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/app-user';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }

  firestoreUsersCollection = this.firestore.collection('users');

  async addIfNotExist(fbUser: firebase.User): Promise<void> {
    let appUser = await this.get(fbUser.uid);
    if (!appUser) {
      appUser = {
        name: fbUser.displayName,
        email: fbUser.email,
        isAdmin: false
      };
      const appUserDoc = this.firestoreUsersCollection.doc(fbUser.uid);
      appUserDoc.set(appUser);
    }
  }

  async get(id: string): Promise<AppUser | null> {
    const appUser$ = this.firestoreUsersCollection.doc(id).get();
    const appUser = await appUser$?.toPromise();
    const appUserData = appUser?.data() as AppUser;
    return appUserData;
  }
}
