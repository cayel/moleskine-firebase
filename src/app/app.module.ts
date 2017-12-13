import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-4-data-table';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { BookService } from './book.service';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ConcertFormComponent } from './concert-form/concert-form.component';
import { ConcertService } from './concert.service';
import { ConcertsComponent } from './concerts/concerts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { MoviesComponent } from './movies/movies.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieService } from './movie.service';
import { TvshowsComponent } from './tvshows/tvshow/tvshows.component';
import { TvshowFormComponent } from './tvshows/tvshow-form/tvshow-form.component';
import { TvshowService } from './tvshow.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    MyBooksComponent,
    LoginComponent,
    BooksFormComponent,
    ProfileComponent,
    ConcertFormComponent,
    ConcertsComponent,
    AdminComponent,
    MoviesComponent,
    MovieFormComponent,
    TvshowsComponent,
    TvshowFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path : 'login', component: LoginComponent },
      // User
      { path : 'books/new', component: BooksFormComponent, canActivate: [AuthGuard]},
      { path : 'books/:id', component: BooksFormComponent, canActivate: [AuthGuard]},
      { path : 'my-books', component: MyBooksComponent, canActivate: [AuthGuard]},
      { path : 'movies/new', component: MovieFormComponent, canActivate: [AuthGuard] },      
      { path : 'movies/:id', component: MovieFormComponent, canActivate: [AuthGuard] },      
      { path : 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
      { path : 'concerts/new', component: ConcertFormComponent, canActivate: [AuthGuard] },      
      { path : 'concerts/:id', component: ConcertFormComponent, canActivate: [AuthGuard] },      
      { path : 'concerts', component: ConcertsComponent, canActivate: [AuthGuard] },      
      { path : 'tvshows/new', component: TvshowFormComponent, canActivate: [AuthGuard] },      
      { path : 'tvshows/:id', component: TvshowFormComponent, canActivate: [AuthGuard] },      
      { path : 'tvshows', component: TvshowsComponent, canActivate: [AuthGuard] },      
      { path : 'profile', component: ProfileComponent,  canActivate: [AuthGuard] },
      // Admin
      { path : 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    BookService,
    ConcertService,
    MovieService,
    TvshowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
