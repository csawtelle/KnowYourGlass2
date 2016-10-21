import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/home.html'
  styleUrls:['../css/main.css']
})
export class HomeComponent { 
  title = "Know Your Glass";
  reviews: Review[];

  constructor(private reviewService: ReviewService) { 
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
      console.log(this.reviews);
    });
  }
}
