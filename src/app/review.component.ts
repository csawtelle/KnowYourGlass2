import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'review',
  templateUrl: './views/review.html',
  animations: [
    trigger('slide', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ReviewComponent { 
  sideBarState:string = 'in';
  review: Review;
  reviewName:string = '';
  pageIdentifier:string = '';
  disqusShortname:string = 'knowyourglass';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.reviewName = params['id']);
    this.reviewService.getReview(this.reviewName).subscribe(review => this.review = review[0]);
    this.pageIdentifier = this.reviewName; 
  }

  toggleSlideState() {
    console.log(this.sideBarState);
    this.sideBarState = this.sideBarState === 'out' ? 'in' : 'out';
  }
}
