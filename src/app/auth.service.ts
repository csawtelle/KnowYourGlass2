import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  username: string;
  password: string;
  tempPassword: string;
  persistPassword: string;
  email: string;
  token: boolean;

  constructor(public http: Http) { 
  } //end constructor

  accountSearch (terms: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get('/api/user' + '?search=' + terms, options)
      .map((r: Response) => r.json() as any);
  }
  //this should be a promise not observable
  createToken(user: string, password: string) {
    this.username = user;
    this.password = password;
    let body = ({'username':this.username,'password':this.password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/authenticate', body, options)
      .map((res: Response) => {
        var response = res.json();
        this.token = response.success;
        localStorage.setItem(
          'user', 
          JSON.stringify({
            username: this.username,
            token: response.token
          })
        )
      })
      .catch(this.handleError);
  }
  //this should be a promise not observable
  validateToken() {
    if (localStorage.getItem('user')) {
      var user = JSON.parse(localStorage.getItem('user'));
      let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": user.token });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('api/user/verify', '', options)
        .map((res: Response) => {
          var response = res.json();
          this.token = response.success;
        })
        .catch(this.handleError);
    }
  }
  //this should be a promise not observable
  register(username: string, email: string): Observable<any> {
    this.username = username;
    this.email = email;
    let body = ({'username':this.username, 'email':this.email});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('api/user/register', body, options)
      .map((res: Response) => res.json() as any)
      .catch(this.handleError);
  }

  //this should be a promise not observable
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
    localStorage.removeItem('user');
    this.token = false;
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
