import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ConcertService {

  constructor(private db: AngularFireDatabase) { }
  
  create(concert, userId) {
    return this.db.list('/concerts/'+userId+'/').push(concert);
  }

  getAll(userId) {
    return this.db.list('/concerts/'+userId,{query: {orderByChild : 'date', }});
  }

  getLast(userId) {
    return this.db.list('/concerts/'+userId,{query: {orderByChild : 'date', limitToLast:5 }});
  } 

  get(concertId, userId) {
    return this.db.object('/concerts/' + userId+ '/' + concertId);
  }

  update(concertId, concert, userId) {
    return this.db.object('/concerts/'+userId+'/'+concertId).update(concert);
  }

  delete(concertId, userId) {
    return this.db.object('/concerts/'+userId+'/'+concertId).remove();
  }
}
