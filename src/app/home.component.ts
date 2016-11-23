import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'home-page',
  templateUrl: './views/home.html',
})
export class HomeComponent { 
  title = "Know Your Glass";
  reviews: any;

  constructor(private reviewService: ReviewService) { 
    this.reviewService.getReviews().subscribe(reviews => this.reviews = reviews);
  }
}
