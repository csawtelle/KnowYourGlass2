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
var http_1 = require('@angular/http');
var ReviewService = (function () {
    function ReviewService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.apiUrl = 'api/pages'; // URL to web api
        this.auth = '?username=admin&password=admin';
        this.http = http;
        this.reviews = this.http.get(this.apiUrl + '/' + this.auth);
    }
    ReviewService.prototype.reviewSearch = function (terms) {
        return this.http
            .get(this.apiUrl + this.auth + '&search=1' + terms)
            .map(function (r) { return r.json().data; });
    };
    ReviewService.prototype.getReview = function (name) {
        console.log(name);
        return this.http.get(this.apiUrl + '/' + name + this.auth)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReviewService.prototype.getReviews = function () {
        return this.http.get(this.apiUrl + '/' + this.auth)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReviewService.prototype.postReview = function (object) {
        var body = JSON.stringify(object);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + this.auth, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReviewService.prototype.putReview = function (oldName, object) {
        var body = JSON.stringify(object);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.apiUrl + '/' + oldName + this.auth, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReviewService.prototype.deleteReview = function (name) {
        return this.http.delete(this.apiUrl + '/' + name + this.auth)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReviewService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    ReviewService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ReviewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReviewService);
    return ReviewService;
}());
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map