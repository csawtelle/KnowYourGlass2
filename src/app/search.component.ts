import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'kyg-app',
  templateUrl: './views/search.html',
})
export class SearchComponent implements OnInit { 
  reviews: Observable<Review[]>;
  private searchTerms = new Subject<string>();
  private params = {};

  private list = {
    'brands': [
      {'text': 'Any', 'value': ''},
      {'text': 'Nikon', 'value': 'Nikon'},
      {'text': 'Canon', 'value': 'Canon'},
      {'text': 'Sigma', 'value': 'Sigma'},
    ],
    'categories': [
      {'text': 'Any', 'value': ''},
      {'text': '8-24mm Ultra Wide Angle', 'value': '8-24mm Ultra Wide Angle'},
      {'text': '24-35mm Wide Angle', 'value': '24-35mm Wide Angle'},
      {'text': '35-85mm Standard', 'value': '35-85mm Standard'},
      {'text': '85-135mm Short Telephoto', 'value': '85-135mm Short Telephoto'},
      {'text': '135-300mm Medium Telephoto', 'value': '135-300mm Medium Telephoto'},
      {'text': '300mm+ Super Telephoto', 'value': '300mm+ Super Telephoto'}
    ],
    'sensors': [
      {'text': 'Any', 'value': ''},
      {'text': 'Crop', 'value': 'Crop'},
      {'text': 'Full Frame', 'value': 'Full Frame'}
    ],
    'ratings': [
      {'text': 'Any', 'value': ''},
      {'text': '0 Stars', 'value': 'rating0'},
      {'text': '1 Star', 'value': 'rating1'},
      {'text': '2 Stars', 'value': 'rating2'},
      {'text': '3 Stars', 'value': 'rating3'},
      {'text': '4 Stars', 'value': 'rating4'},
      {'text': '5 Stars', 'value': 'rating5'},
      {'text': '6 Stars', 'value': 'rating6'},
      {'text': '7 Stars', 'value': 'rating7'},
      {'text': '8 Stars', 'value': 'rating8'},
      {'text': '9 Stars', 'value': 'rating9'},
      {'text': '10 Stars', 'value': 'rating10'}
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

  openReview(name: string) {
    let link = ['/review', name]
    this.router.navigate(link);
  }

  search(text: string, search: any) {
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

  itemSelected(item: string) {
    console.log(item);
  }
}
