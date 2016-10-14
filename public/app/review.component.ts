import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/review.html',
})
export class ReviewComponent { 

  title = "Know Your Glass";
  reviews: Review[];
  sreview: Review[];

  constructor(private reviewService: ReviewService) { 
    this.reviewService.reviews.subscribe((observer) => {
      console.log(observer);
    });
  }
}
