import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../book.service';
import { UserService } from '../../user.service';
import { AppUser } from '../../models/app-user';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  book = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private bookService: BookService) { 
    
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }

  save(book) {
    if (this.id) this.bookService.update(this.id, book, this.userId);
    else this.bookService.create(book, this.userId);
    
    this.router.navigate(['my-books']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.bookService.get(this.id, this.userId).take(1).subscribe(b => this.book = b);
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
