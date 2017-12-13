import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ComicService {

  constructor(private db: AngularFireDatabase) { }
  
  create(comic, userId) {
    return this.db.list('/comics/'+userId+'/').push(comic);
  }

  getAll(userId) {
    return this.db.list('/comics/'+userId,{query: {orderByChild : 'date', }});
  }

  get(comicId, userId) {
    return this.db.object('/comics/' + userId+ '/' + comicId);
  }

  update(comicId, comic, userId) {
    return this.db.object('/comics/'+userId+'/'+comicId).update(comic);
  }

  delete(comicId, userId) {
    return this.db.object('/comics/'+userId+'/'+comicId).remove();
  }
}
