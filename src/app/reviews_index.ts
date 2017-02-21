import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './views/reviews_index.html'
})
export class ReviewsIndexComponent { 
  reviews: any = [];
  unsortedReviews: any;
  response: any;
  constructor(private authService: AuthService, private reviewService: ReviewService) { 
    this.reviewService.getReviews()
      .subscribe(reviews => {
        this.unsortedReviews = reviews;
        let reviewsLength = this.unsortedReviews.length;
        for(let i = 0; i < reviewsLength; i++) {
          this.reviews[i] = this.unsortedReviews[reviewsLength - (i + 1)];
        }
      });
  }
}
