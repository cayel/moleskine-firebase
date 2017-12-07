import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { ConcertService } from '../concert.service';
import { Concert } from '../models/concert';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy  {
  csvUrl: string = './sample.csv';  // URL to web API
  csvData: any[] = [];
  fileName : string;
  public fileString;
  userId: string;
  userSubscription : Subscription;

  constructor(private router: Router, private authService: AuthService,private concertService: ConcertService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
      
  async saveConcert(mainArtist : string, otherArtist : string, date : string, venue : string, rating: number) {
    let convertDate : Date;
    convertDate = new Date(Date.parse(date));    
    let concert = new Concert(mainArtist, otherArtist, convertDate.getTime(), venue, rating);
    let result = await this.concertService.create(concert,this.userId);
  }

  extractData() {
    let allTextLines = this.fileString.split(/\r\n|\n/);
    let headers = allTextLines[0].split('\t');
    let lines = [];
    for ( let i = 1; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split('\t');
      if (data.length == headers.length) {
          let tarr = [];
          for ( let j = 0; j < headers.length; j++) {

              tarr.push(data[j]);
          }              
          this.saveConcert(data[1], data[2], data[4], data[3], data[5]);
          lines.push(tarr);
      }
    }
    this.router.navigate(['concerts']);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    this.fileName = file.name;
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
      this.fileString = myReader.result;
    };
    myReader.readAsText(file);
  }

  changeListener($event) {
    this.readThis($event.target);
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }  
}
