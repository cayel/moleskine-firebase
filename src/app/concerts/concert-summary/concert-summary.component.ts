import { Component, OnInit, OnDestroy } from '@angular/core';
import { Concert } from '../../models/concert';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { ConcertService } from '../../concert.service';

@Component({
  selector: 'concert-summary',
  templateUrl: './concert-summary.component.html',
  styleUrls: ['./concert-summary.component.css']
})
export class ConcertSummaryComponent implements OnInit, OnDestroy {
  concerts: Concert[];
  concertSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private authService: AuthService,  private concertService: ConcertService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.concertSubscription = this.concertService.getLast(this.userId).subscribe(concerts => {
        this.concerts = concerts;
        this.concerts.reverse();
      });
    });
  }

  concertActive() {
    if (!this.concerts) return false;
    if (this.concerts.length==0) return false;
    return true;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.concertSubscription.unsubscribe();
  }
}
  
