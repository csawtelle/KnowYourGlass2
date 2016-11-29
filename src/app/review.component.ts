import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'review',
  templateUrl: './views/review.html',
})
export class ReviewComponent { 
  review: Review;
  reviewName = '';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.reviewName = params['id']);
    console.log("the params id is: " + this.reviewName);
    this.reviewService.getReview(this.reviewName).subscribe(review => this.review = review[0]);
    console.log("this.review from review component is: " + this.review);
  }
}
