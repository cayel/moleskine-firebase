import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../book.service';
import { UserService } from '../../user.service';
import { AppUser } from '../../models/app-user';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService, 
    private bookService: BookService) { 
  }

  save(book) {
    this.bookService.create(book, this.userId);
    this.router.navigate(['my-books']);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
