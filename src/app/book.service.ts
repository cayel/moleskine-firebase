import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BookService {

  constructor(private db: AngularFireDatabase) { }

  create(book, uid) {
    return this.db.list('/books/'+uid+'/').push(book);
  }

}
