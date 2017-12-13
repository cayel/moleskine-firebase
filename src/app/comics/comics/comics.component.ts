import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Comic } from '../../models/comic';
import { DataTableResource } from 'angular-4-data-table';
import { AuthService } from '../../auth.service';
import { ComicService } from '../../comic.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  userSubscription: Subscription;
  userId: string;
  comics: Comic[];
  comicSubscription: Subscription;
  tableResource: DataTableResource<Comic>;
  items: Comic[] = [];
  itemCount: number;

  constructor(private authService: AuthService, private comicService: ComicService) {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
   }

  initializeTable(comics: Comic[]) {
    this.tableResource = new DataTableResource(comics);
    this.tableResource.query({offset:0, limit:10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filteredcomics = (query) ?
      this.comics.filter(b => b.title.toLowerCase().includes(query.toLowerCase())) : 
      this.comics;

    this.initializeTable(filteredcomics);
  }

  ngOnInit() {
    this.comicSubscription = this.comicService.getAll(this.userId).subscribe(comics => {
      this.comics = comics;
      this.comics.reverse();
      this.initializeTable(comics);
    }); 
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.comicSubscription.unsubscribe();
  }
}
