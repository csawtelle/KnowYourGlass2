import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(){
    //console.log('Checking right now to see if the user is logged in');
     
    return this.checkLogin()

  }

  checkLogin(){
    if (true) { 
      return true 
    }
    console.log("Checking if user is logged in.");
  
  }
}
