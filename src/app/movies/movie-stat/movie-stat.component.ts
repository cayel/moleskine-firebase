import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { MovieService } from '../../movie.service';
import { StatMovie } from '../../stat-helper';

@Component({
  selector: 'movie-stat',
  templateUrl: './movie-stat.component.html',
  styleUrls: ['./movie-stat.component.css']
})


export class MovieStatComponent implements OnInit, OnDestroy{
  movies: Movie[];
  movieSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  statMoviesByYear=[];
  statMoviesByDirector=[];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels:string[] = [];
  public barChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(63,127,191,0.8)',
    },
    { 
      backgroundColor: 'rgba(329,96,44,0.8)',
    }
  ];  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [{data : [], label:'TV', stack : 'a'},
  {data : [], label:'Cinéma', stack : 'a'}];
   

  constructor(private authService: AuthService,  private movieService: MovieService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.movieSubscription = this.movieService.getAll(this.userId).subscribe(movies => {
        this.movies = movies;
        this.statMoviesByYear = this.organizeMoviesByYear();
        this.statMoviesByDirector = this.organizeMoviesByDirector();
   
        let dataChart=[];          
        let dataChartCinema=[];
        for ( let i = 0; i < this.statMoviesByYear.length; i++) {
              this.barChartLabels.push(this.statMoviesByYear[i].key);
              dataChart.push(this.statMoviesByYear[i].count-this.statMoviesByYear[i].countCinema);
              dataChartCinema.push(this.statMoviesByYear[i].countCinema);
        };
        this.barChartData= [
          {data: dataChart, label: 'TV', stack : 'a'},         
          {data: dataChartCinema, label: 'Cinéma', stack: 'a'}];         
      });      
    });
  }

  filterMoviesDirector(count){
    return this.statMoviesByDirector.filter(x => x.count > count).sort(function (a, b) {
      return b.average - a.average;
    });
  }

  getStatMovie(key : string, stat) : StatMovie {
    for ( let i = 0; i < stat.length; i++) {
      if (stat[i].key == key) return stat[i];
    }
    return null;
  }

  isCinema(movie) {
    if (typeof movie.cinema === "string") {
      let valueCinema : string; 
      valueCinema = movie.cinema;
      valueCinema = valueCinema.toLowerCase();
      if (valueCinema =="false") return false;
      else if (valueCinema =="true") return true;
    } else return movie.cinema;
  }

  addStatMovie(stat, movie) {
    stat.average = ((+stat.average*stat.count) + (+movie.rating)) / (+stat.count+1);
    stat.count++;
    if (this.isCinema(movie)) stat.countCinema++;
  }

  organizeMoviesByDirector() {
    let stat = [];
    for ( let i = 0; i < this.movies.length; i++) {
      let director = this.movies[i].director;
      let statMovie : StatMovie; 
      statMovie = this.getStatMovie(director, stat);      
      if (!statMovie) {
        statMovie = { key: director, count : 0, countCinema : 0,  average : 0 };
        stat.push(statMovie);
      }
      this.addStatMovie(statMovie, this.movies[i])
    }
    return stat;
  }
  
  organizeMoviesByYear() {
    let stat = [];
    for ( let i = 0; i < this.movies.length; i++) {
      let dateEntry = new Date(this.movies[i].date);
      let year = dateEntry.getFullYear();
      let statMovie : StatMovie; 
      statMovie = this.getStatMovie(year.toString(), stat);      
      if (!statMovie) {
        statMovie = { key: year.toString(), count : 0, countCinema : 0,  average : 0 };
        stat.push(statMovie);
      }
      this.addStatMovie(statMovie, this.movies[i])
    }
    return stat;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();
  }
}
