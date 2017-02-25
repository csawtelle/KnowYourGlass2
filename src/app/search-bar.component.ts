import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'search-bar',
  templateUrl: './views/search-bar.html',
})
export class SearchBarComponent implements OnInit { 
  reviews: Observable<Review[]>;
  private searchTerms = new Subject<string>();

  constructor( private router: Router, public reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.reviews = this.searchTerms
      .debounceTime(150)
      .distinctUntilChanged()
      .switchMap(term => term.length > 0 ? this.reviewService.reviewSearch(term): Observable.of<Review[]>([]))
      .catch(error => {
        return Observable.of<Review[]>([]);
      });
  }

  search(search: string) {
    let link = ['/search', search]
    this.router.navigate(link);
  }

  partialSearch(search: string): void {
    if(search && search != '&search=') {
      this.searchTerms.next(search);
    } else {
      this.searchTerms.next('');
    }
  }

  openReview(name: string) {
    this.searchTerms.next('');
    let link = ['/review', name]
    this.router.navigate(link);
  }
}
