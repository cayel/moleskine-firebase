import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Tvshow } from '../../models/tvshow';
import { DataTableResource } from 'angular-4-data-table';
import { AuthService } from '../../auth.service';
import { TvshowService } from '../../tvshow.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  tvshows: Tvshow[];
  tvshowSubscription: Subscription;
  tableResource: DataTableResource<Tvshow>;
  items: Tvshow[] = [];
  itemCount: number;

  constructor(private authService: AuthService, private tvshowService: TvshowService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  initializeTable(tvshows: Tvshow[]) {
    this.tableResource = new DataTableResource(tvshows);
    this.tableResource.query({offset:0, limit:10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filteredtvshows = (query) ?
      this.tvshows.filter(b => b.title.toLowerCase().includes(query.toLowerCase())) : 
      this.tvshows;

    this.initializeTable(filteredtvshows);
  }

  ngOnInit() {
    this.tvshowSubscription = this.tvshowService.getAll(this.userId).subscribe(tvshows => {
      this.tvshows = tvshows;
      this.tvshows.reverse();
      this.initializeTable(tvshows);
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.tvshowSubscription.unsubscribe();
  }
}
