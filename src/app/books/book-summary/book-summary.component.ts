import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../../book.service';
import { AuthService } from '../../auth.service';
import { DateHelper } from '../../date-helper';

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
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2017'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: '2017'}
  ];

  constructor(private authService: AuthService,  private bookService: BookService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.bookSubscription = this.bookService.getLast(this.userId).subscribe(books => {
        this.books = books;
        this.books.reverse();
      });
    });
  }

  chartData () {    
    let countBooks = 0;
    for ( let i = 1; i < this.books.length; i++) {
      let dateEntry = new Date(this.books[i].date);
      if (dateEntry.getFullYear() == 2017) {
        countBooks++;
      }
    }
    this.barChartData= [
      {data: [countBooks], label: '2017'}
    ];
    /*
    this.barChartData  = [
      {data: [countBooks], label: '2017'}
    ];
    */    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
