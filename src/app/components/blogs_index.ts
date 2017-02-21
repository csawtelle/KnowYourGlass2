import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blogs.service';

@Component({
  templateUrl: '../views/blogs_index.html'
})

export class BlogsIndexComponent {
  Blogs: any = [];
  constructor(private blogService: BlogService) {
  }
  
  ngOnInit(){
    this.blogService.getBlogs()
                .subscribe(response => {  
                this.Blogs = response;
                });
  }

}
