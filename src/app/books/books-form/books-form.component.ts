import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth.service';
import { BookService } from '../../book.service';
import { Book } from '../../models/book';
import { DateHelper } from '../../date-helper';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  dateEntry;
  book: Book = {title:'',writer:'',date: new Date().getTime(), rating:5, imageUrl:'http://'};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private bookService: BookService) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  save(book) {
    book.date = new Date(Date.parse(this.dateEntry)).getTime();

    if (this.id) this.bookService.update(this.id, book, this.userId);
    else this.bookService.create(book, this.userId);

    this.router.navigate(['my-books']);
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer ce livre ?')) return;
      
    this.bookService.delete(this.id, this.userId);
    this.router.navigate(['my-books']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.bookService.get(this.id, this.userId).take(1).subscribe(b => {
      this.book = b;
      this.dateEntry = new DateHelper().formatDate(new Date(this.book.date));
    });
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
