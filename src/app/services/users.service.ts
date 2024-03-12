import { Injectable } from '@angular/core';
import { Firestore, doc, collection, addDoc, collectionData, getDoc, where, QueryConstraint, query } from '@angular/fire/firestore';
import User from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) {
  }

  addUser(user: User) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef) as Observable<User[]>;
  }


  getUser(uid: string): Observable<User[]> {
    const userQuery = query(collection(this.firestore, 'users'), where('uid', '==', uid));
    return collectionData(userQuery) as Observable<User[]>;
  }

}