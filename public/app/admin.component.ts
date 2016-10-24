import { Component,OnInit } from '@angular/core';
import { Post } from './models/post';
import { PostService } from './services/post.service';



@Component({
  selector: 'admin-page',
  templateUrl: 'views/admin.html'

})
export class AdminComponent implements OnInit { 
  posts: Post[];

  constructor(private service: PostService) {

  }

  ngOnInit() {
    this.service.getPosts().then(posts => this.posts = posts);
  }
}
