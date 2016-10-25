import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const posts = ([
  { id: 1, title: 'Post number 1', description:'This is test paragraph #1', image:'../images/is3.jpg' },
  { id: 2, title: 'Post number 2', description:'This is test paragraph #2', image:'../images/is4.jpg' }
]);


@Component ({
  templateUrl: '../views/singlepost.html'
})

export class SinglePostComponent implements OnInit {
  post;

  constructor(private route: ActivatedRoute) {
  
  }

  ngOnInit(){
    let title = this.route.snapshot.params['title'];
    console.log(title);

    this.post = posts.find(function(post){
      return post.title === title;
    });
  }
}
