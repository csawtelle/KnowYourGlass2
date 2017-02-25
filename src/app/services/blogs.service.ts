import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BlogService {
  blogs: any;
  token: any;
  private BLOGS_URL: string = 'api/blogs';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
  }

  getSingleBlog(title: String): Observable<Object>{
    return this.http.get(`${this.BLOGS_URL}/${title}`).map(r => r.json());
  }
  getBlogs(): Observable<any>{
    return this.http.get(this.BLOGS_URL).map(r => r.json()); 
  }
}
