import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { ConcertService } from '../concert.service';
import { Book } from '../models/book';
import { Concert } from '../models/concert';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy  {
  csvUrl: string = './sample.csv';  // URL to web API
  csvData: any[] = [];
  fileNameBook : string;
  fileNameConcert : string;
  public fileString;
  userId: string;
  userSubscription : Subscription;

  constructor(private router: Router, private authService: AuthService,private bookService: BookService,private concertService: ConcertService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  async saveBook(title : string, writer : string, date : string, rating: number) {
    let convertDate : Date;
    convertDate = new Date(Date.parse(date));    
    let book = new Book(title, writer, convertDate.getTime(), rating, 'http://');
    let result = await this.bookService.create(book,this.userId);
  }

  async saveConcert(mainArtist : string, otherArtist : string, date : string, venue : string, rating: number) {
    let convertDate : Date;
    convertDate = new Date(Date.parse(date));    
    let concert = new Concert(mainArtist, otherArtist, convertDate.getTime(), venue, rating);
    let result = await this.concertService.create(concert,this.userId);
  }

  extractDataFromCsvFile (fileString) : any {
    let allTextLines = fileString.split(/\r\n|\n/);
    let headers = allTextLines[0].split('\t');
    let lines = [];
    for ( let i = 1; i < allTextLines.length; i++) {
      // split content based on tabulation
      let data = allTextLines[i].split('\t');
      if (data.length == headers.length) {
        let tarr = [];
        for ( let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);            
        }              
        lines.push(tarr);
      }
    }
    return lines;
  }

  extractDataConcert() {
    let lines = [];
    lines = this.extractDataFromCsvFile(this.fileString);
    for ( let i = 1; i < lines.length; i++) {
      this.saveConcert(lines[i][1], lines[i][2], lines[i][4], lines[i][3], lines[i][5]);
    }
    this.router.navigate(['concerts']);
  }

  extractDataBook() {
    let lines = [];
    lines = this.extractDataFromCsvFile(this.fileString);
    for ( let i = 1; i < lines.length; i++) {
      this.saveBook(lines[i][1], lines[i][2], lines[i][3], lines[i][4]);
    }
    this.router.navigate(['my-books']);
  }

  readThisConcert(inputValue: any): void {
    var file: File = inputValue.files[0];
    this.fileNameConcert = file.name;
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
      this.fileString = myReader.result;
    };
    myReader.readAsText(file);
  }

  readThisBook(inputValue: any): void {
    var file: File = inputValue.files[0];
    this.fileNameBook = file.name;
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
      this.fileString = myReader.result;
    };
    myReader.readAsText(file);
  }
  
  changeListenerConcert($event) {
    this.readThisConcert($event.target);
  }

  changeListenerBook($event) {
    this.readThisBook($event.target);
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }  
}