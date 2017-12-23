import { Component, OnInit} from '@angular/core';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/book';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';
import { ComicService } from '../comic.service';
import { ConcertService } from '../concert.service';
import { TvshowService } from '../tvshow.service';

@Component({
  selector: 'summary-stat',
  templateUrl: './summary-stat.component.html',
  styleUrls: ['./summary-stat.component.css']
})
export class SummaryStatComponent implements OnInit {
  userId : string;
  books$;
  movies$;
  comics$;
  concerts$;
  tvshows$;

  constructor(private authService: AuthService, 
      private bookService: BookService, 
      private movieService: MovieService,
      private comicService: ComicService,
      private concertService: ConcertService,
      private tvshowService: TvshowService) {}

  ngOnInit() {    
    this.books$ = this.authService.user$.switchMap(u => this.bookService.getAll(u.uid));
    this.movies$ = this.authService.user$.switchMap(u => this.movieService.getAll(u.uid));
    this.comics$ = this.authService.user$.switchMap(u => this.comicService.getAll(u.uid));
    this.concerts$ = this.authService.user$.switchMap(u => this.concertService.getAll(u.uid));
    this.tvshows$ = this.authService.user$.switchMap(u => this.tvshowService.getAll(u.uid));
  }
}
