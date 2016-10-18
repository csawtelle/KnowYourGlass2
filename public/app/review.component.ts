import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/review.html',
})
export class ReviewComponent { 

  title = "Know Your Glass";
  reviewName = '';
  reviews: Review[];

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.reviewName = this.route.params._value.id
      this.reviewService.reviews.subscribe((observer) => {
        this.reviews = JSON.parse(observer._body).data;
      });
    }
}
