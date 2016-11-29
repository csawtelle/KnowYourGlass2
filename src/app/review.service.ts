import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Review} from './models/review';

@Injectable()
export class ReviewService { 
  reviews: any;
  private token: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api/pages';  // URL to web api
  constructor(private http: Http) { 
    this.reviews = this.getReviews();
  }

  reviewSearch (terms: string): Observable<Review[]> {
    return this.http
      .get(this.apiUrl + '&search=1' + terms)
      .map((r: Response) => r.json().data as Review[]);
  }

  getReview (name: string): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    console.log("Options for single get review is: " + options);
    return this.http.get(this.apiUrl + '/' + name, options)
      .map((r: Response) => r.json().data as any)
      .catch(this.handleError);
  }
  getReviews (): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token":null });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/', options)
      .map((r: Response) => r.json().data as any);
  }

  postReview (object: any): Observable<Review[]> {
    let body = JSON.stringify( object );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putReview (oldName: string, object: any): Observable<Review[]> {
    let body = JSON.stringify(object);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + oldName, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteReview (name: string): Observable<Review[]> {
    return this.http.delete(this.apiUrl + '/' + name)
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
