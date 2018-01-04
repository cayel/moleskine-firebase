import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Movie } from '../models/movie';
import { DataTableResource } from 'angular-4-data-table';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  movies: Movie[];
  movieSubscription: Subscription;
  tableResource: DataTableResource<Movie>;
  items: Movie[] = [];
  itemCount: number;

  constructor(private authService: AuthService, private movieService: MovieService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  initializeTable(movies: Movie[]) {
    this.tableResource = new DataTableResource(movies);
    this.tableResource.query({offset:0, limit:10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filteredmovies = (query) ?
      this.movies.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.director.toLowerCase().includes(query.toLowerCase())) : 
      this.movies;

    this.initializeTable(filteredmovies);
  }

  isCinema(movie) {
    if (typeof movie.cinema === "string") {
      let valueCinema : string; 
      valueCinema = movie.cinema;
      valueCinema = valueCinema.toLowerCase();
      if (valueCinema =="false") return false;
      else if (valueCinema =="true") return true;
    } else return movie.cinema;
  }

  ngOnInit() {
    this.movieSubscription = this.movieService.getAll(this.userId).subscribe(movies => {
      this.movies = movies;
      this.movies.reverse();
      this.initializeTable(movies);
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();
  }
}
