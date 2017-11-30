import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { Book } from '../models/book';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  books: Book[];
  bookSubscription: Subscription;
  tableResource: DataTableResource<Book>;
  items: Book[] = [];
  itemCount: number;

  constructor(private authService: AuthService, private bookService: BookService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  initializeTable(books: Book[]) {
    this.tableResource = new DataTableResource(books);
    this.tableResource.query({offset:0, limit:10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filteredBooks = (query) ?
      this.books.filter(b => b.title.toLowerCase().includes(query.toLowerCase())) : 
      this.books;

    this.initializeTable(filteredBooks);
  }

  ngOnInit() {
    this.bookSubscription = this.bookService.getAll(this.userId).subscribe(books => {
      this.books = books;
      this.books.reverse();
      this.initializeTable(books);
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
