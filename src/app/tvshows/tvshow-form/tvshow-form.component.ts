import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Tvshow } from '../../models/tvshow';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { TvshowService } from '../../tvshow.service';
import { DateHelper } from '../../date-helper';

@Component({
  selector: 'app-tvshow-form',
  templateUrl: './tvshow-form.component.html',
  styleUrls: ['./tvshow-form.component.css']
})
export class TvshowFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  dateEntry;
  tvshow: Tvshow = {title:'',season:1,date: new Date().getTime(), rating:5, imageUrl:'http://'};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private tvshowService: TvshowService) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  save(tvshow) {
    console.log(tvshow);
    tvshow.date = new Date(Date.parse(this.dateEntry)).getTime();

    console.log(tvshow);
    if (this.id) this.tvshowService.update(this.id, tvshow, this.userId);
    else this.tvshowService.create(tvshow, this.userId);

    this.router.navigate(['tvshows']);
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer cette série ?')) return;
      
    this.tvshowService.delete(this.id, this.userId);
    this.router.navigate(['tvshows']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.tvshowService.get(this.id, this.userId).take(1).subscribe(b => {
      this.tvshow = b;
      this.dateEntry = new DateHelper().formatDate(new Date(this.tvshow.date));
    });
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}