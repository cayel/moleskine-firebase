import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Comic } from '../../models/comic';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ComicService } from '../../comic.service';
import { DateHelper } from '../../date-helper';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.css']
})
export class ComicFormComponent implements OnInit {
  userSubscription: Subscription;
  userId: string;
  dateEntry;
  comic: Comic = {title:'',serie:'',volume:0, scenarist: '', cartoonist: '', date: new Date().getTime(), rating:5, imageUrl:'http://'};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private comicService: ComicService) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  save(comic) {
    comic.date = new Date(Date.parse(this.dateEntry)).getTime();

    if (this.id) this.comicService.update(this.id, comic, this.userId);
    else this.comicService.create(comic, this.userId);

    this.router.navigate(['comics']);
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer cette BD ?')) return;
      
    this.comicService.delete(this.id, this.userId);
    this.router.navigate(['comics']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.comicService.get(this.id, this.userId).take(1).subscribe(b => {
      this.comic = b;
      this.dateEntry = new DateHelper().formatDate(new Date(this.comic.date));
    });
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
