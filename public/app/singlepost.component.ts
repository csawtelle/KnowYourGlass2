import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component ({
  template:`

  <div class="jumbotron text-center">
  <h2>This is a single post</h2>
  </div>
  `
})

export class SinglePostComponent {

  constructor(private route: ActivatedRoute) {
  
  }
  ngOnInit(){
    let title = this.route.snapshot.params['title'];
    console.log(title);
  }

}
