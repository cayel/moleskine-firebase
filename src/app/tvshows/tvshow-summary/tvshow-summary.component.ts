import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tvshow } from '../../models/tvshow';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { TvshowService } from '../../tvshow.service';

@Component({
  selector: 'tvshow-summary',
  templateUrl: './tvshow-summary.component.html',
  styleUrls: ['./tvshow-summary.component.css']
})
export class TvshowSummaryComponent implements OnInit, OnDestroy {
  
  tvshows: Tvshow[];
  tvshowSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private authService: AuthService,  private tvshowService: TvshowService ) { 
  }

  tvShowActive() {
    if (!this.tvshows) return false;
    if (this.tvshows.length==0) return false;
    return true;
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.tvshowSubscription = this.tvshowService.getLast(this.userId).subscribe(tvshows => {
        this.tvshows = tvshows;
        this.tvshows.reverse();
      });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.tvshowSubscription.unsubscribe();
  }
}
