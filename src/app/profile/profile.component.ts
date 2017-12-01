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

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
      this.userSubscription = this.authService.user$.subscribe(user => {
        this.user = user;
        this.userId = user.uid;
        console.log(this.user);
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
