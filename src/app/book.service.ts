import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BookService {

  constructor(private db: AngularFireDatabase) { }

  create(book, userId) {
    return this.db.list('/books/'+userId+'/').push(book);
  }

  getAll(userId) {
    return this.db.list('/books/'+userId,{query: {orderByChild : 'date', }});
  }

  getLast(userId) {
    return this.db.list('/books/'+userId,{query: {orderByChild : 'date', limitToLast:5 }});
  }

  get(bookId, userId) {
    return this.db.object('/books/' + userId+ '/' + bookId);
  }

  update(bookId, book, userId) {
    return this.db.object('/books/'+userId+'/'+bookId).update(book);
  }

  delete(bookId, userId) {
    return this.db.object('/books/'+userId+'/'+bookId).remove();
  }
}
