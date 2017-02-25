import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Review } from './models/review';

@Injectable()
export class ReviewService { 
  reviews: any;
  token: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api/reviews';  // URL to web api
  constructor(public http: Http) { }

  reviewSearch (terms: string): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.apiUrl + '?' + terms, options)
      .map((r: Response) => r.json().data as Review[]);
  }

  getReview (name: string): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token":  this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/' + name, options)
      .map((r: Response) => r.json().data as any)
      .catch(this.handleError);
  }
  getReviews (): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/', options)
      .map((r: Response) => r.json().data as any);
  }

  postReview (object: any): Observable<Review[]> {
    let body = JSON.stringify( object );
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putReview (oldName: string, object: any): Observable<Review[]> {
    let body = JSON.stringify(object);
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/' + oldName, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteReview (name: string): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiUrl + '/' + name, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
