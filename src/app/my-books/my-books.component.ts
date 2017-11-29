import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  books: Book[];
  filteredBooks: Book[];
  bookSubscription: Subscription

  constructor(private authService: AuthService, private bookService: BookService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  filter(query: string) {
    this.filteredBooks = (query) ?
      this.books.filter(b => b.title.toLowerCase().includes(query.toLowerCase())) : 
      this.books;
  }

  ngOnInit() {
    this.bookSubscription = this.bookService.getAll(this.userId).subscribe(books => this.filteredBooks = this.books = books); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
