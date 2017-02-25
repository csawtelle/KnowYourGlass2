import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService, private router: Router ) {
  };
  canActivate(){
    return this.checkLogin()
  }
  checkLogin(){
    if(this.authService.token) {
      return true
    } else {
      this.router.navigate([{outlets: {modaloutlet:'login'}}]);
      return false
    }
  }
}
