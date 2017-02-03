import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'review',
  templateUrl: './views/review.html',
  animations: [
    trigger('slide', [
       state('init', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('in', style({
        width: '30%',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '30%',
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ReviewComponent implements OnInit { 
  sideBarState:string = 'init';
  reviewName:string = '';
  review: Review;
  pageUrl: string = '';
  disqusShortName:string = 'christophersawtelle-com';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) {
      console.log(router) 
    }

  ngOnInit() {
    this.route.params.subscribe(params => this.reviewName = params['id']);
    this.reviewService.getReview(this.reviewName).subscribe(review => this.review = review[0]);
    this.pageUrl = 'christophersawtelle.com/' + this.reviewName;
  }

  toggleSlideState() {
    console.log(this.sideBarState);
    console.log(this.review._id);
    if(this.sideBarState == "out") {
      this.sideBarState = "in";
    } else if (this.sideBarState == "in") {
      this.sideBarState = "out";
    } else {
      this.sideBarState = "in";
    }
  }
}
