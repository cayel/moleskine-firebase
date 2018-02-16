import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Movie } from '../../models/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { BookService } from '../../book.service';
import { DateHelper } from '../../date-helper';
import { MovieService } from '../../movie.service';
import { MovieDbService } from '../../moviedb.service';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { MovieReferenceService } from '../../movie-reference.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  dateEntry;
  movie: Movie = {title:'',director:'',cinema: false, date: new Date().getTime(), rating:5, imageUrl:'http://', comment: '', idMovieDb: -1, releaseDate : 0};
  id;
  currentRate;
  
  modelMovieReference: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private movieService: MovieService,
    private movieDbService: MovieDbService,
    private movieReferenceService : MovieReferenceService
  ) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  } 

  save(movie) {
    if (!this.modelMovieReference) alert ('Vous devez choisir un titre dans la base de référence');
    else {
      movie.idMovieDb = this.modelMovieReference.id;
      movie.title = this.modelMovieReference.title;
      movie.releaseDate =  new Date(Date.parse(this.modelMovieReference.release_date)).getTime();
      movie.date = new Date(Date.parse(this.dateEntry)).getTime();
      movie.rating = this.currentRate;
  
      if (this.id) this.movieService.update(this.id, movie, this.userId);
      else this.movieService.create(movie, this.userId);
  
      this.movieReferenceService.addRating(movie.idMovieDb, movie.title, movie.releaseDate, this.userId, movie.rating );
      this.router.navigate(['movies']);  
    }
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer ce film ?')) return;
      
    this.movieService.delete(this.id, this.userId);
    this.router.navigate(['movies']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.movieService.get(this.id, this.userId).take(1).subscribe(m => {
      this.movie = m;
      // if type of value cinema is string
      if (typeof m.cinema === "string") {
        let valueCinema : string; 
        valueCinema = m.cinema;
        valueCinema = valueCinema.toLowerCase();
        if (valueCinema =="false") m.cinema = false;
        else if (valueCinema =="true") m.cinema = true;
      }
      if (typeof m.comment != "string") m.comment = "";
      // if property comment doesn't exist (old version)
      if (typeof m.comment === "undefined") {
        m.comment = '';
      }
      this.currentRate = m.rating;
      if (typeof this.movie.idMovieDb === "number") {
        // Movie reference found in database
        if (this.movie.idMovieDb > 0 ) {
          this.movieDbService.getMovieFromId(this.movie.idMovieDb).subscribe(movieRef => this.modelMovieReference = movieRef);
        }         
      } else 
      {
        // No movie reference in database
      }     
      this.dateEntry = new DateHelper().formatDate(new Date(this.movie.date));
    });
    else {
      this.currentRate = 5;
    }    
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.movieDbService.getMoviesFromTitle(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);
  
      
  formatter = (x: {title: string}) => x.title;

  onChangeTitle() {
    /*
    if (this.modelMovieReference) {
      this.movieDbService.getCreditsFromId(this.modelMovieReference.id).subscribe(credits => {
        for ( let i = 0; i < credits.crew.length; i++) {
          if (credits.crew[i].job == "Director") {
            this.movie.director = credits.crew[i].name;
            break;
          }
        }
      });
    }
    */
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
