import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RequestMethod } from '@angular/http';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  user: string;
  password: string;
  token: string;

  constructor(public http: Http) { 
  } //end constructor
  getToken(user: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    this.user= user;
    this.password= password;
    let body = ({'name':this.user,'password':this.password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ 
                      headers: headers, 
                      method:RequestMethod.Post,
                      url:'api2/authenticate'
                      });
    return this.http.post('api2/authenticate', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log("Loggedin was set to false!");
  }

  public extractData(res: Response) {
    let body = res.json();
    console.log("Extract Data: ");
    console.log(body);
    return body || { };
  }

  public saveToken(res: Response) {
    console.log(res);
    let body = res.json();
    console.log(body);
    this.token = body.token;
    console.log(this.token)
    return body || { };
  }
  showToken(){
    return this.token;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
