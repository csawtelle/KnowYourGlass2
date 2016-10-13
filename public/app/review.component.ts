import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service'; //import review service code
import { Review } from './models/review';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/review.html',
  providers: [ReviewService] // tell the code that the review service is a provider?
})
export class ReviewComponent { 
  reviews: Review[];

  constructor(private reviewService: ReviewService) { } //?
  ngOnInit(): void {
    this.reviewService.getReviews().then( reviews => this.reviews = reviews); //when the review component loads, run getReviews
  }
}
