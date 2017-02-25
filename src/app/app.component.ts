import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kyg-app',
  templateUrl: './views/app.html',
})
export class AppComponent { 
  
  constructor( private authService: AuthService ) {
    this.authService.validateToken().subscribe();
  }
  logout(){
    this.authService.logout();
  }
}
