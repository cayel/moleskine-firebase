import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Movie } from '../../models/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { BookService } from '../../book.service';
import { DateHelper } from '../../date-helper';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  dateEntry;
  movie: Movie = {title:'',director:'',cinema: false, date: new Date().getTime(), rating:5, imageUrl:'http://', comment: ''};
  id;
  currentRate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private movieService: MovieService) { 
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  save(movie) {
    movie.date = new Date(Date.parse(this.dateEntry)).getTime();
    movie.rating = this.currentRate;

    if (this.id) this.movieService.update(this.id, movie, this.userId);
    else this.movieService.create(movie, this.userId);

    this.router.navigate(['movies']);
  }

  delete() {
    if (!confirm('Etes-vous sûr de vouloir supprimer ce film ?')) return;
      
    this.movieService.delete(this.id, this.userId);
    this.router.navigate(['movies']);
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.movieService.get(this.id, this.userId).take(1).subscribe(m => {
      this.movie = m;
      // if type of value cinema is string
      if (typeof m.cinema === "string") {
        let valueCinema : string; 
        valueCinema = m.cinema;
        valueCinema = valueCinema.toLowerCase();
        if (valueCinema =="false") m.cinema = false;
        else if (valueCinema =="true") m.cinema = true;
      }
      // if property comment doesn't exist (old version)
      if (typeof m.comment === "undefined") {
        m.comment = '';
      }
      this.currentRate = m.rating;
      this.dateEntry = new DateHelper().formatDate(new Date(this.movie.date));
    });
    else {
      this.currentRate = 5;
    }
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
