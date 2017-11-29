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

  get(bookId, userId) {
    console.log(bookId+userId)
    return this.db.object('/books/' + userId+ '/' + bookId);
  }

  update(bookId, book, userId) {
    return this.db.object('/books/'+userId+'/'+bookId).update(book);
  }

  delete(bookId, userId) {
    return this.db.object('/books/'+userId+'/'+bookId).remove();
  }
}
