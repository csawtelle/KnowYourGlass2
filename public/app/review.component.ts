import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'review',
  templateUrl: 'views/review.html',
})
export class ReviewComponent { 
  review: Review;
  reviewName = '';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
       let reviewName = params['id']; // (+) converts string 'id' to a number
       this.reviewService.getReview(reviewName).subscribe(review => this.review = review[0]);
    });

  }
}
