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
var review_1 = require('./models/review');
var forms_1 = require('@angular/forms');
var ModalComponent = (function () {
    function ModalComponent(modalService, _fb) {
        this.modalService = modalService;
        this._fb = _fb;
    }
    ModalComponent.prototype.ngOnInit = function () {
        this.modalForm = this._fb.group({
            name: [this.review.name, [forms_1.Validators.required]],
            date: [this.review.date, [forms_1.Validators.required]],
            rating: [this.review.rating, [forms_1.Validators.required]],
            brand: [this.review.brand, [forms_1.Validators.required]],
            category: [this.review.category, [forms_1.Validators.required]],
            image: [this.review.image, [forms_1.Validators.required]],
            pictures: this._fb.array([
                this.review.pictures
            ])
        });
    };
    ModalComponent.prototype.open = function (content) {
        this.modalService.open(content);
    };
    ModalComponent.prototype.initPicture = function () {
        return this._fb.group({
            picture: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required]
        });
    };
    ModalComponent.prototype.addPicture = function () {
        var control = this.modalForm.controls['pictures'];
        control.push(this.initPicture());
    };
    ModalComponent.prototype.removePicture = function (i) {
        var control = this.modalForm.controls['pictures'];
        control.removeAt(i);
    };
    ModalComponent.prototype.save = function (model, isValid) {
        console.log(model, isValid);
    };
    __decorate([
        core_1.Input('review'), 
        __metadata('design:type', review_1.Review)
    ], ModalComponent.prototype, "review", void 0);
    __decorate([
        core_1.Input('reviewName'), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "reviewName", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            templateUrl: '../views/modal.html'
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbModal, forms_1.FormBuilder])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map