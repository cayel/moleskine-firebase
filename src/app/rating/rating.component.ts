import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input('currentRate') currentRate;
  @Output() rateChanged : EventEmitter<number> = new EventEmitter<number>();
  lastRate;

  constructor() { }

  ngOnInit() {
    this.lastRate = this.currentRate; 
  }

  onChangeRate() {
    if (this.currentRate != this.lastRate) {
      this.rateChanged.emit(this.currentRate);
      this.lastRate = this.currentRate;
    }    
  }
}
