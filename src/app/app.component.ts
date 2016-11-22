import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kyg-app',
  templateUrl: './views/app.html',
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
