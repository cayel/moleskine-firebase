import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { MovieService } from '../../movie.service';

class Stat {
  key: string;
  count: number;
  average: number;
}

@Component({
  selector: 'app-movie-stat',
  templateUrl: './movie-stat.component.html',
  styleUrls: ['./movie-stat.component.css']
})


export class MovieStatComponent implements OnInit, OnDestroy{
  movies: Movie[];
  movieSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  statMovies=[];

  constructor(private authService: AuthService,  private movieService: MovieService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.movieSubscription = this.movieService.getAll(this.userId).subscribe(movies => {
        this.movies = movies;
        this.organizeMoviesByYear();
      });
    });
  }

  getStatMovie(year:number) : Stat {
    for ( let i = 0; i < this.statMovies.length; i++) {
      if (this.statMovies[i].key == year) return this.statMovies[i];
    }
    return null;
  }

  addStatMovie(stat, movie) {
    stat.average = ((+stat.average*stat.count) + (+movie.rating)) / (+stat.count+1);
    stat.count++;
  }

  organizeMoviesByDirector() {
  }
  
  organizeMoviesByYear() {
    for ( let i = 0; i < this.movies.length; i++) {
      let dateEntry = new Date(this.movies[i].date);
      let year = dateEntry.getFullYear();
      let statMovie : Stat; 
      statMovie = this.getStatMovie(year);      
      if (!statMovie) {
        statMovie = { key: year.toString(), count : 0, average : 0 };
        this.statMovies.push(statMovie);
      }
      this.addStatMovie(statMovie, this.movies[i])
    }
    console.log(this.statMovies)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();
  }
}
