import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MovieService {

  constructor(private db: AngularFireDatabase) { }
  
    create(movie, userId) {
      return this.db.list('/movies/'+userId+'/').push(movie);
    }
  
    getAll(userId) {
      return this.db.list('/movies/'+userId,{query: {orderByChild : 'date', }});
    }

    getLast(userId) {
      return this.db.list('/movies/'+userId,{query: {orderByChild : 'date', limitToLast:5 }});
    }    
  
    get(movieId, userId) {
      return this.db.object('/movies/' + userId+ '/' + movieId);
    }
  
    update(movieId, movie, userId) {
      return this.db.object('/movies/'+userId+'/'+movieId).update(movie);
    }
  
    delete(movieId, userId) {
      return this.db.object('/movies/'+userId+'/'+movieId).remove();
    }
}
