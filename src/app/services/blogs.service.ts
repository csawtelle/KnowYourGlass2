import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tokenservice } from './token.service';

@Injectable()
export class BlogService {
  blogs: any;
  token: any;

}
