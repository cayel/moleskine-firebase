import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// https://makina-corpus.com/blog/metier/2017/premiers-pas-avec-rxjs-dans-angular

@Injectable()
export class MovieReferenceService {

  constructor(private db : AngularFireDatabase) { }



  private create(referenceId, title, releaseDate) {
    return this.db.list('/movie-reference').push({
      movieId : referenceId,
      dateCreated: new Date().getTime(),
      title : title,
      releaseDate : releaseDate
    });
  }

  private getItemByMovieId(movieId) {
    return this.db.list('/movie-reference', {
      query: {
        orderByChild: 'movieId',
        equalTo: movieId
      }
    });
  }

  private updateRatingUser(keyMovie, userId, userRating) {
    this.db.object('/movie-reference/'+keyMovie+'/ratings/'+userId).update({         
      userRating: userRating,
      dateRating: new Date() 
    });
  }

  private async updateRating (movieId, title,  releaseDate, userId, userRating) {
    return this.getItemByMovieId(movieId).take(1).subscribe((data : any[]) => {
      if (data.length > 0) this.updateRatingUser(data[0].$key, userId, userRating);
      else {
        let result = this.create(movieId, title, releaseDate);
        if (result.key) this.updateRatingUser(result.key, userId, userRating);
      }
    });
  }

  addRating (referenceId, title, releaseDate, userId, userRating) {
    this.updateRating(referenceId, title,  releaseDate, userId, userRating);
  }

}
