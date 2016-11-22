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
var HomeComponent = (function () {
    function HomeComponent(reviewService) {
        var _this = this;
        this.reviewService = reviewService;
        this.title = "Know Your Glass";
        this.reviewService.reviews.subscribe(function (observer) {
            _this.reviews = JSON.parse(observer._body).data;
            console.log(_this.reviews);
        });
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-page',
            templateUrl: '../views/home.html',
        }), 
        __metadata('design:paramtypes', [review_service_1.ReviewService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map