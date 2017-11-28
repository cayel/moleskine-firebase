import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BookService {

  constructor(private db: AngularFireDatabase) { }

  create(book, userId) {
    return this.db.list('/books/'+userId+'/').push(book);
  }

  getAll(userId) {
    return this.db.list('/books/'+userId);
  }

}
