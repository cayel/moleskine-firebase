import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Concert } from '../models/concert';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConcertService } from '../concert.service';

@Component({
  selector: 'app-concert-form',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.css']
})
export class ConcertFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  concert: Concert = {artist:'',with:'',venue: '',date: new Date(), rating:5};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private concertService: ConcertService) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  save(concert) {
    if (this.id) this.concertService.update(this.id, concert, this.userId);
    else this.concertService.create(concert, this.userId);

    this.router.navigate(['concerts']);
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer ce concert ?')) return;
      
    this.concertService.delete(this.id, this.userId);
    this.router.navigate(['concerts']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.concertService.get(this.id, this.userId).take(1).subscribe(c => this.concert = c);
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
