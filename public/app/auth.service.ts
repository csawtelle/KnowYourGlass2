import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  isLoggedIn = false;

  login(): void {
    this.isLoggedIn = true;
    console.log("Loggedin was set to true!";
  }
  logout(): void {
    this.isLoggedIn = false;
    console.log("Loggedin was set to false!");
  }
}
