import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/book';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  books: Book[];
  movies: Movie[];
  bookSubscription: Subscription;
  movieSubscription: Subscription;

  constructor(private authService: AuthService, private bookService: BookService, private movieService: MovieService) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.bookSubscription = this.bookService.getLast(this.userId).subscribe(books => {
        this.books = books;
        this.books.reverse();
        this.movieSubscription = this.movieService.getLast(this.userId).subscribe(movies => {
          this.movies = movies;
          this.movies.reverse();
        });
      });       
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();    
  }

}
