import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class TokenService{
  token: any; 
  username: string;
  password: string;
  currentToken: any;
  constructor(public http: Http, public authService: AuthService){

  }
  loginDelay(): Observable<any>{
    this.token = this.token;
    return Observable.of(true).delay(1000).do(val => this.currentToken = this.token);
  }
  getToken(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.authService.getToken(username, password)
    .subscribe(response => this.token = response.token);
  }
  clearToken(){
    this.currentToken = null;
  }
  grabToken(){
    return this.token;
  }
}
