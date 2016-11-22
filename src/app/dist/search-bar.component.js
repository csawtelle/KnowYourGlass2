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
var SearchBarComponent = (function () {
    function SearchBarComponent(router, reviewService) {
        this.router = router;
        this.reviewService = reviewService;
        this.searchTerms = new Subject_1.Subject();
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reviews = this.searchTerms
            .debounceTime(700)
            .distinctUntilChanged()
            .switchMap(function (term) { return term ? _this.reviewService.reviewSearch(term) : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    SearchBarComponent.prototype.search = function (search) {
        var link = ['/search', search];
        this.router.navigate(link);
    };
    SearchBarComponent.prototype.partialSearch = function (search) {
        this.searchTerms.next(search);
    };
    SearchBarComponent.prototype.openReview = function (name) {
        var link = ['/review', name];
        this.router.navigate(link);
    };
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'search-bar',
            templateUrl: '../views/search-bar.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, review_service_1.ReviewService])
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
//# sourceMappingURL=search-bar.component.js.map