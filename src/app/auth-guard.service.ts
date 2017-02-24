import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router ) {};
  canActivate(){
    return this.checkLogin()
  }
  checkLogin(){
    console.log("Can activate and checklogin was called.");
    if (localStorage.getItem('currentUser')) {
      return true 
    } else {
      console.log("Check did not return true");
      this.router.navigate([{outlets: {modaloutlet:'login'}}]);
      return false
    }
  }
}
