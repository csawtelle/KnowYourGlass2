import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  isLoggedIn: boolean;
  username: string;
  password: string;
  tempPassword: string;
  persistPassword: string;
  email: string;
  token: string;

  constructor(public http: Http) { 
  } //end constructor

  accountSearch (terms: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get('/api/user' + '?search=' + terms, options)
      .map((r: Response) => r.json().data as any);
  }

  getToken(user: string, password: string): Observable<any> {
    // commenting this out, this should not be here
    //    this.isLoggedIn = true;
    this.username = user;
    this.password = password;
    let body = ({'username':this.username,'password':this.password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/authenticate', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  register(username: string, email: string): Observable<any> {
    console.log("Called Register");
    this.username = username;
    this.email = email;
    let body = ({'username':this.username, 'email':this.email});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    console.log("The body is: " + JSON.stringify(body));
    console.log("The header are: " + JSON.stringify(headers));
    console.log("The options: " + JSON.stringify(options));
    return this.http.post('api/user/register', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  confirmRegister(username: string, tempPassword: string, persistPassword: string, email: string): Observable<any> {
    this.username = username;
    this.tempPassword = tempPassword;
    this.persistPassword = persistPassword;
    this.email = email;

    let body = ({'username': this.username, 'tempPassword': this.tempPassword, 'persistPassword': this.persistPassword, 'email': this.email });
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
