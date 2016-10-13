import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Review} from './models/review';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReviewService { 

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api/pages';  // URL to web api
  constructor(private http: Http) { }

  getReviews(): Promise<Review[]> {
    return this.http.get(this.apiUrl)
               .toPromise()
               .then(response => response.json().data as Review[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

