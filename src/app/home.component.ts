import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'home-page',
  templateUrl: './views/home.html',
})
export class HomeComponent { 
  title = "Know Your Glass";
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
