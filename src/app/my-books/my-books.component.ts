import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  books$;

  constructor(private authService: AuthService, private bookService: BookService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  ngOnInit() {
    this.books$ = this.bookService.getAll(this.userId); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
