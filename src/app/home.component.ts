import { Component, OnInit } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import { Router }from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';
@Component({
  selector: 'home-page',
  templateUrl: './views/home.html',
})
export class HomeComponent { 
  title = "Know Your Glass";
  reviews: any = [];
  unsortedReviews: any;
  response: any;
  constructor(private router: Router, private authService: AuthService, private reviewService: ReviewService) { 
    PageScrollConfig.defaultDuration = 2000;
    PageScrollConfig.defaultEasingLogic = {
			ease: (t: number, b: number, c: number, d: number): number => {
      	if (t === 0) return b;
      	if (t === d) return b + c;
      	if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    	}
		}

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
