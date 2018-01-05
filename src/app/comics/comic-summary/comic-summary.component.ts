import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comic } from '../../models/comic';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { ComicService } from '../../comic.service';

@Component({
  selector: 'comic-summary',
  templateUrl: './comic-summary.component.html',
  styleUrls: ['./comic-summary.component.css']
})
export class ComicSummaryComponent implements OnInit, OnDestroy {
  comics: Comic[];
  comicSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private authService: AuthService,  private comicService: ComicService ) { 
  }

  comicActive() {
    if (!this.comics) return false;
    if (this.comics.length==0) return false;
    return true;
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.comicSubscription = this.comicService.getLast(this.userId).subscribe(comics => {
        this.comics = comics;
        this.comics.reverse();
      });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.comicSubscription.unsubscribe();
  }
}
  