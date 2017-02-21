import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlogService } from '../services/blogs.service';
@Component({
  templateUrl: '../views/blogs_single.html'
})

export class BlogSingleComponent implements OnInit {
  param: String; 
  post: Object;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private blogService: BlogService
  ){}

  ngOnInit(){
    this.route.params.subscribe(param => this.param = param['title']);
    this.blogService
    .getSingleBlog(this.param)
    .subscribe(r => {
      this.post = r;
    });
  }
}
