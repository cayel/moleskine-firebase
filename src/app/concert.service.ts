import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ConcertService {

  constructor(private db: AngularFireDatabase) { }
  
  create(concert, userId) {
    console.log(concert);
    return this.db.list('/concerts/'+userId+'/').push(concert);
  }

  getAll(userId) {
    return this.db.list('/concerts/'+userId,{query: {orderByChild : 'date', }});
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
