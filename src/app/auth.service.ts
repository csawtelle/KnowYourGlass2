import { Injectable } from '@angular/core';
<<<<<<< HEAD:src/app/auth.service.ts
import { User } from './models/user';
=======
>>>>>>> 1878593... need to fix payload request, it is all null currently.:public/app/auth.service.ts
import { Routes } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RequestMethod } from '@angular/http';
@Injectable()
export class AuthService {
  constructor(private http: Http) { } //end constructor

  isLoggedIn: boolean;
  user: User;
  password: any;
  testvar: any = "thisistheglobaltest";

  getToken(user, password): Observable<any> {
    this.isLoggedIn = true;
    this.user= user;
    this.password= password;
    console.log("user from getToken is: " + this.user);
    console.log("password from getToken is: " + this.password);
    let body = ({'name':this.user,'password':this.password});
    let headers = new Headers({'Content-Type': 'application/json','name':this.user, 'password':this.password});
    let options = new RequestOptions({ 
                      headers: headers, 
                      method:RequestMethod.Post,
                      url:'api2/authenticate'
                      });
    return this.http.post('api2/authenticate', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getTestVar(){
    return this.testvar;
  }
  logout(): void {
    this.isLoggedIn = false;
    console.log("Loggedin was set to false!");
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("Extract Data: ");
    console.log(body);
    return body || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
