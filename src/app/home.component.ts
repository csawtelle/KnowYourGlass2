import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import { Router }from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';
@Component({
  selector: 'home-page',
  templateUrl: './views/home.html'
})
export class HomeComponent { 
  title = "Know Your Glass";
  reviews: any = [];
  unsortedReviews: any;
  response: any;
  @ViewChild('scrollElement') scrollElement:ElementRef;
  constructor(private router: Router, private authService: AuthService, private reviewService: ReviewService) { 
    PageScrollConfig.defaultDuration = 1250;
    PageScrollConfig.defaultEasingLogic = {
			ease: (t: number, b: number, c: number, d: number): number => {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
          t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
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

  goToHash() {
    this.scrollElement.nativeElement.click();
  }
};
