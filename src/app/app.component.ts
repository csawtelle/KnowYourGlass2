import { Component } from '@angular/core';
import { TokenService } from './token.service';
@Component({
  selector: 'kyg-app',
  templateUrl: './views/app.html',
})
export class AppComponent { 

  constructor(public tokenService: TokenService) {}

  logout(){
    this.tokenService.clearToken();    
  }

}
