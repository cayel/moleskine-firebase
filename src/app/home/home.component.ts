import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userId: string;
  connected

  constructor(private authService: AuthService) { 
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (!user) {
        return;
      }
      this.userId = user.uid
    });
  }

  ngOnInit() {  
  }

  ngOnDestroy() {    
    this.userSubscription.unsubscribe(); 
    console.log('home unsubscribe');
  }

}
