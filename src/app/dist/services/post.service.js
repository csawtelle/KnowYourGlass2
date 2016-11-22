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
var postsPromise = Promise.resolve([
    { id: 1, title: 'Post number 1', description: 'This is test paragraph #1', image: '../images/is3.jpg' },
    { id: 2, title: 'Post number 2', description: 'This is test paragraph #2', image: '../images/is4.jpg' }
]);
var PostService = (function () {
    function PostService() {
    }
    //Get all posts
    PostService.prototype.getPosts = function () {
        return postsPromise;
    };
    PostService.prototype.getPost = function (title) {
        return postsPromise.then(function (posts) { return posts.find(function (post) { return post.title === title; }); });
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map