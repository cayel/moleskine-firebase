import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class TvshowService {

  constructor(private db: AngularFireDatabase) { }
  
    create(tvshow, userId) {
      return this.db.list('/tvshows/'+userId+'/').push(tvshow);
    }
  
    getAll(userId) {
      return this.db.list('/tvshows/'+userId,{query: {orderByChild : 'date', }});
    }

    getLast(userId) {
      return this.db.list('/tvshows/'+userId,{query: {orderByChild : 'date', limitToLast:5 }});
    }       
  
    get(tvshowId, userId) {
      return this.db.object('/tvshows/' + userId+ '/' + tvshowId);
    }
  
    update(tvshowId, tvshow, userId) {
      return this.db.object('/tvshows/'+userId+'/'+tvshowId).update(tvshow);
    }
  
    delete(tvshowId, userId) {
      return this.db.object('/tvshows/'+userId+'/'+tvshowId).remove();
    }
}

