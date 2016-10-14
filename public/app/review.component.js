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
var review_service_1 = require('./review.service'); //import review service code
var ReviewComponent = (function () {
    function ReviewComponent(reviewService) {
        this.reviewService = reviewService;
    } //?
    ReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reviewService.getReviews().then(function (reviews) { return _this.reviews = reviews; }); //when the review component loads, run getReviews
        this.reviewService.getReview('test').then(function (sreview) { return _this.sreview = sreview; });
    };
    ReviewComponent = __decorate([
        core_1.Component({
            selector: 'kyg-app',
            templateUrl: 'views/review.html',
            providers: [review_service_1.ReviewService] // tell the code that the review service is a provider?
        }), 
        __metadata('design:paramtypes', [review_service_1.ReviewService])
    ], ReviewComponent);
    return ReviewComponent;
}());
exports.ReviewComponent = ReviewComponent;
//# sourceMappingURL=review.component.js.map