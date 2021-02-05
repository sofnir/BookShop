import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private firestore: AngularFirestore) {}

  firestoreCollection = this.firestore.collection('books');

  //READ
  books$ = this.firestoreCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(p => {
        const book = p.payload.doc as any;
        const id = book.id;
        return { id, ...book.data() as any } as Book;
      })
    })
  );

  get(id: string) {
    return this.firestoreCollection.doc(id).snapshotChanges().pipe(
      map(item => {        
        return { id, ...item.payload.data() as any } as Book;
      })
    )
  }

  //CREATE
  async add(data: Book): Promise<void> {
    try {
      await this.firestoreCollection.add(data);
    } catch (error) {
      console.log(error);
    }
  }

  //UPDATE
  async update(id: string, data: Book): Promise<void> {
    try {
      await this.firestoreCollection.doc(id).set(data, { merge: true });
    } catch (err) {
      console.log(err);
    }
  }

  //DELETE
  async delete(id: string): Promise<void> {
    try {
      await this.firestoreCollection.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }  
}
