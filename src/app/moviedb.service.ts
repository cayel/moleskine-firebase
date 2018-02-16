import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const BASE_URL = 'https://api.themoviedb.org/3';

@Injectable()
export class MovieDbService {

  constructor(private http: Http) { }

  private apiKey() {
    return 'a8b3a2051ebcb3de59544ae5d389d5e8';
  }

  getMovieFromId(idMovieDb) {
    let query = BASE_URL+'/movie/'+idMovieDb+'?api_key='+this.apiKey()+'&language=fr-FR';
    return this.http.get(query)
      .map(response => response.json());      
  }

  getCreditsFromId(idMovieDb) {
    let query = BASE_URL+'/movie/'+idMovieDb+'/credits?api_key='+this.apiKey()+'&language=fr-FR';
    return this.http.get(query)
      .map(response => response.json());          
  }

  getMoviesFromTitle(searchTitle) {
    let query = 'https://api.themoviedb.org/3/search/movie?api_key=a8b3a2051ebcb3de59544ae5d389d5e8&language=fr-FR&page=1&include_adult=false&query='+searchTitle;
    return this.http.get(query)
      .map(response => 
      response.json().results
      );
  }

}
