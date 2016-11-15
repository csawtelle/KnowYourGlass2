import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'kyg-app',
  templateUrl: 'views/search.html',
})
export class SearchComponent implements OnInit { 
  reviews: Observable<Review[]>;
  private searchTerms = new Subject<string>();
  private params = {};

  private list = {
    'brands': [
      'Any',
      'Nikon',
      'Canon',
      'Sigma'
    ],
    'categories': [
      'Any',
      '8-24mm Ultra Wide Angle',
      '24-35mm Wide Angle',
      '35-85mm Standard',
      '85-135mm Short Telephoto',
      '135-300mm Medium Telephoto',
      '300mm+ Super Telephoto'
    ],
    'sensors': [
      'Any',
      'Crop',
      'Full Frame'
    ],
    'ratings': [
      'Any',
      'rating0',
      'rating1',
      'rating2',
      'rating3',
      'rating4',
      'rating5',
      'rating6',
      'rating7',
      'rating8',
      'rating9',
      'rating10'
    ]
  }

  constructor( private router: Router, public reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.reviews = this.searchTerms
      .distinctUntilChanged()
      .switchMap(term => term ? this.reviewService.reviewSearch(term): Observable.of<Review[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Review[]>([]);
      });
  }

  openReview(name) {
    let link = ['/review', name]
    this.router.navigate(link);
  }

  search(text, search) {
    var searchString = '';
    for (var key in search) {
      var value = search[key];
      searchString = searchString + '&' + key + '=' + value;
    }
    if(text) {
      searchString = searchString + '&text=' + text;
    }
    console.log(searchString);
    this.searchTerms.next(searchString);
  }

  itemSelected(item) {
    console.log(item);
  }
}
