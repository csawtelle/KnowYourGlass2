import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  user: User;
  login(user){
    this.user = user;
    this.isLoggedIn = true;
    console.log("User from auth service is: " + this.user.username);
    console.log("Loggedin was set to true!");
  }
  logout(): void {
    this.isLoggedIn = false;
    console.log("Loggedin was set to false!");
  }
}
