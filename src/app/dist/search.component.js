"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var review_service_1 = require('./review.service');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var SearchComponent = (function () {
    function SearchComponent(router, reviewService) {
        this.router = router;
        this.reviewService = reviewService;
        this.searchTerms = new Subject_1.Subject();
        this.params = {};
        this.list = {
            'brands': [
                { 'text': 'Any', 'value': '' },
                { 'text': 'Nikon', 'value': 'Nikon' },
                { 'text': 'Canon', 'value': 'Canon' },
                { 'text': 'Sigma', 'value': 'Sigma' },
            ],
            'categories': [
                { 'text': 'Any', 'value': '' },
                { 'text': '8-24mm Ultra Wide Angle', 'value': '8-24mm Ultra Wide Angle' },
                { 'text': '24-35mm Wide Angle', 'value': '24-35mm Wide Angle' },
                { 'text': '35-85mm Standard', 'value': '35-85mm Standard' },
                { 'text': '85-135mm Short Telephoto', 'value': '85-135mm Short Telephoto' },
                { 'text': '135-300mm Medium Telephoto', 'value': '135-300mm Medium Telephoto' },
                { 'text': '300mm+ Super Telephoto', 'value': '300mm+ Super Telephoto' }
            ],
            'sensors': [
                { 'text': 'Any', 'value': '' },
                { 'text': 'Crop', 'value': 'Crop' },
                { 'text': 'Full Frame', 'value': 'Full Frame' }
            ],
            'ratings': [
                { 'text': 'Any', 'value': '' },
                { 'text': '0 Stars', 'value': 'rating0' },
                { 'text': '1 Star', 'value': 'rating1' },
                { 'text': '2 Stars', 'value': 'rating2' },
                { 'text': '3 Stars', 'value': 'rating3' },
                { 'text': '4 Stars', 'value': 'rating4' },
                { 'text': '5 Stars', 'value': 'rating5' },
                { 'text': '6 Stars', 'value': 'rating6' },
                { 'text': '7 Stars', 'value': 'rating7' },
                { 'text': '8 Stars', 'value': 'rating8' },
                { 'text': '9 Stars', 'value': 'rating9' },
                { 'text': '10 Stars', 'value': 'rating10' }
            ]
        };
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reviews = this.searchTerms
            .distinctUntilChanged()
            .switchMap(function (term) { return term ? _this.reviewService.reviewSearch(term) : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    SearchComponent.prototype.openReview = function (name) {
        var link = ['/review', name];
        this.router.navigate(link);
    };
    SearchComponent.prototype.search = function (text, search) {
        var searchString = '';
        for (var key in search) {
            var value = search[key];
            searchString = searchString + '&' + key + '=' + value;
        }
        if (text) {
            searchString = searchString + '&text=' + text;
        }
        console.log(searchString);
        this.searchTerms.next(searchString);
    };
    SearchComponent.prototype.itemSelected = function (item) {
        console.log(item);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'kyg-app',
            templateUrl: '../views/search.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, review_service_1.ReviewService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map