import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(){
    console.log('Checking right now to see if the user is logged in');
    return true;

  }
}
