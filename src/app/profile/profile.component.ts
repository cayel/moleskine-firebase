import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { User } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  //user: AppUser = {name:'', email:'', isAdmin: false};
  user: User;
  id;
  appUser;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
      this.userSubscription = authService.appUser$.subscribe(appUser => {
        this.appUser = appUser;
      });
  }

  save(user) {
    /*
    user.uid = this.userId;
    console.log(user);
    this.userService.save(user);
    this.router.navigate(['/']);
    */
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
