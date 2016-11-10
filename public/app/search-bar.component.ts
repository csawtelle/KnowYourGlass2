import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'search-bar',
  templateUrl: 'views/search-bar.html',
})
export class SearchBarComponent implements OnInit { 
  reviews: Observable<Review[]>;
  private searchTerms = new Subject<string>();

  constructor( private router: Router, public reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.reviews = this.searchTerms
      .debounceTime(700)
      .distinctUntilChanged()
      .switchMap(term => term ? this.reviewService.reviewSearch(term): Observable.of<Review[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Review[]>([]);
      });
  }

  search(search) {
    let link = ['/search', search]
    this.router.navigate(link);
  }

  partialSearch(search: string): void {
    this.searchTerms.next(search);
  }

  openReview(name) {
    let link = ['/review', name]
    this.router.navigate(link);
  }
}
