import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService ) {};
  canActivate(){
    return this.checkLogin()
  }
  checkLogin(){
    console.log("Can activate and checklogin was called.");
    if (this.authService.isLoggedIn) { 
      return true 
    }
    console.log("Check did not return true");
      return false 
  }
}
