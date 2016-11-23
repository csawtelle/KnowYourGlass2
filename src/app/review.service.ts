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
      .map(this.extractData)
      .catch(this.handleError);
  }
  getReviews (): Observable<Review[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', "x-access-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiJhZG1pbiIsIm5hbWUiOiJHZXJyeSBSYW1vcyIsIl9pZCI6IjU4MmUyYjQwM2UwMWMwMWY5MTA2NmIyMSJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ3OTU3NTg3OCwiZXhwIjoxNDc5NTc3MzE4fQ.7kM0FHFNNQc8SQu9xcPGkGNY_fLKFoJip2re9e2B7gs' });
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

  deleteReview (name): Observable<Review[]> {
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
