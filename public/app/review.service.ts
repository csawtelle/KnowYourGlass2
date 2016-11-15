import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Review} from './models/review';

@Injectable()
export class ReviewService { 
  reviews: any;

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api/pages';  // URL to web api
  private auth = '?username=admin&password=admin';
  constructor(private http: Http) { 
    this.http = http;
    this.reviews = this.http.get(this.apiUrl + '/' + this.auth);
  }

  reviewSearch (terms): Observable<Review[]> {
    console.log(terms);
    return this.http
      .get(this.apiUrl + this.auth + '&search=1' + terms)
      .map((r: Response) => r.json().data as Review[]);
  }

  getReview (name: string): Observable<Review[]> {
    console.log(name);
    return this.http.get(this.apiUrl + '/' + name + this.auth)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getReviews (): Observable<Review[]> {
    return this.http.get(this.apiUrl + '/' + this.auth)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postReview (object): Observable<Review[]> {
    let body = JSON.stringify( object );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + this.auth, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putReview (oldName, object): Observable<Review[]> {
    let body = JSON.stringify(object);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + oldName + this.auth, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteReview (name): Observable<Review[]> {
    return this.http.delete(this.apiUrl + '/' + name + this.auth)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
