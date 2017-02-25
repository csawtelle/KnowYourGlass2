import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService, private router: Router ) {
    console.log("Auth guard");
    console.log(this.authService.token);
  };
  canActivate(){
    return this.checkLogin()
  }
  checkLogin(){
    console.log(this.authService);
    if(this.authService.token) {
      return true
    } else {
      this.router.navigate([{outlets: {modaloutlet:'login'}}]);
      return false
    }
  }
}
