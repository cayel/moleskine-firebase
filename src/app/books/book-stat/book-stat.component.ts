import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { BookService } from '../../book.service';
import { Stat } from '../../stat-helper';

@Component({
  selector: 'book-stat',
  templateUrl: './book-stat.component.html',
  styleUrls: ['./book-stat.component.css']
})
export class BookStatComponent implements  OnInit, OnDestroy{
  books: Book[];
  bookSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  statBooksByYear=[];
  statBooksByWriter=[];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels:string[] = [];
  public barChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(63,127,191,0.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [{data : [], label:''}]; 

  constructor(private authService: AuthService,  private bookService: BookService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.bookSubscription = this.bookService.getAll(this.userId).subscribe(books => {
        this.books = books;
        this.statBooksByYear = this.organizeMoviesByYear();
        this.statBooksByWriter = this.organizeMoviesByDirector();
   
        let dataChart=[];          
        for ( let i = 1; i < this.statBooksByYear.length; i++) {
              this.barChartLabels.push(this.statBooksByYear[i].key);
              dataChart.push(this.statBooksByYear[i].count);
        };
        this.barChartData= [
          {data: dataChart, label: ''}];         
      });      
    });
  }

  filterBooksWriter(count){
    return this.statBooksByWriter.filter(x => x.count > count).sort(function (a, b) {
      return b.average - a.average;
    });
  }

  getstatBook(key : string, stat) : Stat {
    for ( let i = 0; i < stat.length; i++) {
      if (stat[i].key == key) return stat[i];
    }
    return null;
  }

  addstatBook(stat, movie) {
    stat.average = ((+stat.average*stat.count) + (+movie.rating)) / (+stat.count+1);
    stat.count++;
  }

  organizeMoviesByDirector() {
    let stat = [];
    for ( let i = 0; i < this.books.length; i++) {
      let writer = this.books[i].writer;
      let statBook : Stat; 
      statBook = this.getstatBook(writer, stat);      
      if (!statBook) {
        statBook = { key: writer, count : 0, average : 0 };
        stat.push(statBook);
      }
      this.addstatBook(statBook, this.books[i])
    }
    return stat;
  }
  
  organizeMoviesByYear() {
    let stat = [];
    for ( let i = 0; i < this.books.length; i++) {
      let dateEntry = new Date(this.books[i].date);
      let year = dateEntry.getFullYear();
      let statBook : Stat; 
      statBook = this.getstatBook(year.toString(), stat);      
      if (!statBook) {
        statBook = { key: year.toString(), count : 0, average : 0 };
        stat.push(statBook);
      }
      this.addstatBook(statBook, this.books[i])
    }
    return stat;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }
}
