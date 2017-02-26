import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kyg-app',
  templateUrl: './views/app.html',
})
export class AppComponent { 
  show: boolean = false;
  constructor( private authService: AuthService ) {
    if (localStorage.getItem('user')) {
      this.authService.validateToken().subscribe();
    }
  }
  toggleMenu(){
    this.show = !this.show;
    console.log("Toggle menu was clicked");
  }
  logout(){
    this.authService.logout();
    console.log("Logout was clicked");
  }
}
