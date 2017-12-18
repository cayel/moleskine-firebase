import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../../book.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'book-summary',
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.css']
})
export class BookSummaryComponent implements OnInit, OnDestroy {
  books: Book[];
  bookSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private authService: AuthService,  private bookService: BookService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.bookSubscription = this.bookService.getLast(this.userId).subscribe(books => {
        this.books = books;
        this.books.reverse();
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
