import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kyg-app',
  styles: [`
    .active { color:#000 !important; }
    .navbar { margin-bottom: 50px; }
  `],
  templateUrl: 'views/app.html',
})
export class AppComponent { 
  constructor(private authService: AuthService) {
  }
  logout(){
    console.log("Logout button was clicked");
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
  }

}
