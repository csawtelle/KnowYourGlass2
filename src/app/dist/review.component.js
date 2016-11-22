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
var review_service_1 = require('./review.service');
var router_1 = require('@angular/router');
var ReviewComponent = (function () {
    function ReviewComponent(reviewService, route, router) {
        this.reviewService = reviewService;
        this.route = route;
        this.router = router;
        this.reviewName = '';
    }
    ReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.reviewName = params['id']; });
        this.reviewService.getReview(this.reviewName).subscribe(function (review) { return _this.review = review[0]; });
    };
    ReviewComponent = __decorate([
        core_1.Component({
            selector: 'review',
            templateUrl: '../views/review.html',
        }), 
        __metadata('design:paramtypes', [review_service_1.ReviewService, router_1.ActivatedRoute, router_1.Router])
    ], ReviewComponent);
    return ReviewComponent;
}());
exports.ReviewComponent = ReviewComponent;
//# sourceMappingURL=review.component.js.map