import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { AuthService } from './auth.service';
@Injectable()

export class TokenService{
  token: any; 
  username: string;
  password: string;
  constructor(public http: Http, public authService: AuthService){

  }

  getToken(username: string, password: string){
    this.username = username;
    this.password = password;
    console.log("The username in login is: ", this.username);
    console.log("The password in login is: ", this.password);
    this.authService.getToken(username, password)
    .subscribe(response => this.token = response.token);
    console.log("The token from token service is: " + this.token);
  }
  grabToken(){
    return this.token;
  }
  logToken(){
    console.log("token from logToken is: " + this.token);
  }
}
