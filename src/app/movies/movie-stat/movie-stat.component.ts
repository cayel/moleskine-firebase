import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';
import { MovieService } from '../../movie.service';
import { Stat } from '../../stat-helper';

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
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [{data : [], label:''}]; 

  constructor(private authService: AuthService,  private movieService: MovieService ) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
      this.movieSubscription = this.movieService.getAll(this.userId).subscribe(movies => {
        this.movies = movies;
        this.statMoviesByYear = this.organizeMoviesByYear();
        this.statMoviesByDirector = this.organizeMoviesByDirector();
   
        let dataChart=[];          
        for ( let i = 1; i < this.statMoviesByYear.length; i++) {
              this.barChartLabels.push(this.statMoviesByYear[i].key);
              dataChart.push(this.statMoviesByYear[i].count);
        };
        this.barChartData= [
          {data: dataChart, label: ''}];         
      });      
    });
  }

  filterMoviesDirector(count){
    return this.statMoviesByDirector.filter(x => x.count > count).sort(function (a, b) {
      return b.average - a.average;
    });
  }

  getStatMovie(key : string, stat) : Stat {
    for ( let i = 0; i < stat.length; i++) {
      if (stat[i].key == key) return stat[i];
    }
    return null;
  }

  addStatMovie(stat, movie) {
    stat.average = ((+stat.average*stat.count) + (+movie.rating)) / (+stat.count+1);
    stat.count++;
  }

  organizeMoviesByDirector() {
    let stat = [];
    for ( let i = 0; i < this.movies.length; i++) {
      let director = this.movies[i].director;
      let statMovie : Stat; 
      statMovie = this.getStatMovie(director, stat);      
      if (!statMovie) {
        statMovie = { key: director, count : 0, average : 0 };
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
      let statMovie : Stat; 
      statMovie = this.getStatMovie(year.toString(), stat);      
      if (!statMovie) {
        statMovie = { key: year.toString(), count : 0, average : 0 };
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
