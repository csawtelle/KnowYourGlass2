import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@models/post';
import { PostService } from './services/post.service';

@Component ({
  templateUrl: '../views/singlepost.html'
})

export class SinglePostComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute, private service: PostService) {
  
  }

  ngOnInit(){
    // grab current post
    let title = this.route.snapshot.params['title'];
    this.service.getPost(title).then(post => this.post = post);

  }
  goBack(){
    window.history.back();
    console.log("Clicked go back");
  }
}
