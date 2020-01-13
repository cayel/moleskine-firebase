import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Concert } from '../models/concert';
import { DataTableResource } from 'angular5-data-table';
import { AuthService } from '../auth.service';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css']
})
export class ConcertsComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  concerts: Concert[];
  concertSubscription: Subscription;
  tableResource: DataTableResource<Concert>;
  items: Concert[] = [];
  itemCount: number;

  constructor(private authService: AuthService, private concertService: ConcertService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  initializeTable(concerts: Concert[]) {
    this.tableResource = new DataTableResource(concerts);
    this.tableResource.query({offset:0, limit:10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filteredConcerts = (query) ?
      this.concerts.filter(b => b.mainArtist.toLowerCase().includes(query.toLowerCase()) || b.otherArtist.toLowerCase().includes(query.toLowerCase())) : 
      this.concerts;

    this.initializeTable(filteredConcerts);
  }

  ngOnInit() {
    this.concertSubscription = this.concertService.getAll(this.userId).subscribe(concerts => {
      this.concerts = concerts;
      this.concerts.reverse();
      this.initializeTable(concerts);
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.concertSubscription.unsubscribe();
  }
}
