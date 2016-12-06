import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
@Component({
  selector: 'kyg-app',
  templateUrl: './views/app.html',
})
export class AppComponent { 
  constructor(private authService: AuthService, public tokenService: TokenService) {
  }
  logout(){
    console.log("Logout button was clicked");
//    this.authService.logout();
    this.tokenService.clearToken();    
    console.log(this.tokenService.currentToken);
  }

}
