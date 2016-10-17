import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/edit.html',
})
export class EditComponent { 
  reviews: Review[];
  constructor(private reviewService: ReviewService) { 
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
    });
  }
}
