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
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var review_service_1 = require('./review.service');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('./auth.service');
var AdminComponent = (function () {
    function AdminComponent(authService, reviewService, modalService, _fb) {
        var _this = this;
        this.authService = authService;
        this.reviewService = reviewService;
        this.modalService = modalService;
        this._fb = _fb;
        this.newPost = 0;
        this.alertType = "info";
        this.list = {
            'brands': [
                { 'text': 'Nikon', 'value': 'Nikon' },
                { 'text': 'Canon', 'value': 'Canon' },
                { 'text': 'Sigma', 'value': 'Sigma' },
            ],
            'categories': [
                { 'text': '8-24mm Ultra Wide Angle', 'value': '8-24mm Ultra Wide Angle' },
                { 'text': '24-35mm Wide Angle', 'value': '24-35mm Wide Angle' },
                { 'text': '35-85mm Standard', 'value': '35-85mm Standard' },
                { 'text': '85-135mm Short Telephoto', 'value': '85-135mm Short Telephoto' },
                { 'text': '135-300mm Medium Telephoto', 'value': '135-300mm Medium Telephoto' },
                { 'text': '300mm+ Super Telephoto', 'value': '300mm+ Super Telephoto' }
            ],
            'sensors': [
                { 'text': 'Crop', 'value': 'Crop' },
                { 'text': 'Full Frame', 'value': 'Full Frame' }
            ],
            'ratings': [
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
        this.reviewService.getReviews().subscribe(function (reviews) { return _this.reviews = reviews; });
    }
    AdminComponent.prototype.ngOnInit = function () { };
    AdminComponent.prototype.openNew = function (content) {
        this.newPost = 1;
        this.modalForm = this._fb.group({
            name: ['', [forms_1.Validators.required]],
            date: ['', [forms_1.Validators.required]],
            rating: ['', [forms_1.Validators.required]],
            brand: ['', [forms_1.Validators.required]],
            category: ['', [forms_1.Validators.required]],
            image: ['', [forms_1.Validators.required]],
            title_image: ['', [forms_1.Validators.required]],
            paragraphs: this._fb.array([]),
            pictures: this._fb.array([])
        });
        this.modalRef = this.modalService.open(content);
    };
    AdminComponent.prototype.openOld = function (content, review) {
        this.newPost = 0;
        this.oldName = review.name;
        this.modalForm = this._fb.group({
            name: [review.name, [forms_1.Validators.required]],
            date: [review.date, [forms_1.Validators.required]],
            rating: [review.rating, [forms_1.Validators.required]],
            brand: [review.brand, [forms_1.Validators.required]],
            category: [review.category, [forms_1.Validators.required]],
            image: [review.image, [forms_1.Validators.required]],
            title_image: [review.image, [forms_1.Validators.required]],
            paragraphs: this._fb.array(review.paragraphs),
            pictures: this._fb.array([])
        });
        var control = this.modalForm.controls['pictures'];
        for (var _i = 0, _a = review.pictures; _i < _a.length; _i++) {
            var picture = _a[_i];
            control.push(this._fb.group({
                filename: [picture.filename],
                description: [picture.description]
            }));
        }
        this.modalRef = this.modalService.open(content);
    };
    AdminComponent.prototype.addParagraph = function () {
        var control = this.modalForm.controls['paragraphs'];
        control.push(new forms_1.FormControl(''));
    };
    AdminComponent.prototype.addPicture = function () {
        var control = this.modalForm.controls['pictures'];
        control.push(this._fb.group({
            filename: '',
            description: ''
        }));
    };
    AdminComponent.prototype.deleteReview = function (name) {
        var _this = this;
        this.reviewService.deleteReview(name).subscribe(function (response) { return _this.response = response; });
    };
    AdminComponent.prototype.save = function (model, isValid) {
        var _this = this;
        if (this.newPost) {
            this.reviewService.postReview(model).subscribe(function (response) { return _this.response = response; });
        }
        else {
            this.reviewService.putReview(this.oldName, model).subscribe(function (response) { return _this.response = response; });
        }
        this.modalRef.close();
    };
    AdminComponent.prototype.canDeactivate = function () {
        console.log('i am navigating away');
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: '../views/admin.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, review_service_1.ReviewService, ng_bootstrap_1.NgbModal, forms_1.FormBuilder])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map