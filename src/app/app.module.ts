import { UserService } from './user.service';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-4-data-table';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { BookService } from './book.service';
import { ProfileComponent } from './profile/profile.component';
import { ConcertFormComponent } from './concert-form/concert-form.component';
import { ConcertsComponent } from './concerts/concerts.component';
import { ConcertService } from './concert.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    MyBooksComponent,
    MyMoviesComponent,
    LoginComponent,
    BooksFormComponent,
    ProfileComponent,
    ConcertFormComponent,
    ConcertsComponent
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
      { path : 'my-movies', component: MyMoviesComponent, canActivate: [AuthGuard] },
      { path : 'concerts/new', component: ConcertFormComponent, canActivate: [AuthGuard] },      
      { path : 'concerts/:id', component: ConcertFormComponent, canActivate: [AuthGuard] },      
      { path : 'concerts', component: ConcertsComponent, canActivate: [AuthGuard] },      
      { path : 'concerts', component: ConcertsComponent, canActivate: [AuthGuard] },      
      { path : 'profile', component: ProfileComponent,  canActivate: [AuthGuard] }
      // Admin
      //{ path : 'admin', component: MyMoviesComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    BookService,
    ConcertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
