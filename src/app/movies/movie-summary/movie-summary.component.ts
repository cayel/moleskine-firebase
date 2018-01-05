import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.css']
})
export class MovieSummaryComponent implements OnInit, OnDestroy {
    movies: Movie[];
    movieSubscription: Subscription;
    userSubscription: Subscription;
    userId: string;
  
    constructor(private authService: AuthService,  private movieService: MovieService ) { 
      this.userSubscription = this.authService.user$.subscribe(user => {
        this.userId = user.uid
        this.movieSubscription = this.movieService.getLast(this.userId).subscribe(movies => {
          this.movies = movies;
          this.movies.reverse();
        });
      });
    }
  
    movieActive() {
      if (!this.movies) return false;
      if (this.movies.length==0) return false;
      return true;
    }

    ngOnInit() {
    }
  
    ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.movieSubscription.unsubscribe();
    }
  }
    
