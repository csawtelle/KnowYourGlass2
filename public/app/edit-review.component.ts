import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/edit.html',
})
export class EditComponent { 

  title = "Know Your Glass";
  reviews: Review[];
  sreview: Review[];

  constructor(private reviewService: ReviewService) { 
    this.reviewService.reviews.subscribe((observer) => {
      console.log(JSON.parse(observer._body));
      this.reviews = JSON.parse(observer._body).data;
    });
  }
}
