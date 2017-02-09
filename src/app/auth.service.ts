import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  username: string;
  password: string;
  email: string;
  token: string;


  constructor(public http: Http) { 
  } //end constructor
  getToken(user: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    this.username = user;
    this.password = password;
    let body = ({'username':this.username,'password':this.password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/authenticate', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  register(user: string, email: string): Observable<any> {
    this.username= user;
    this.email= email;
    let body = ({'username':this.username, 'email':this.email});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/register', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  confirmRegister(user: string, password: string, email: string): Observable<any> {
    this.username = user;
    this.password = password;
    this.email = email;
    let body = ({'username': this.username, 'password': this.password, 'email': this.email });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/register/verify', body, options)
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
