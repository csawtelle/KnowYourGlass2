import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin',
  templateUrl: '../views/admin.html'
})
export class AdminComponent implements OnInit{
  public reviews: Review;  
  public modalForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(public reviewService: ReviewService, public modalService: NgbModal, public _fb: FormBuilder) {
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
    });
    this.modalForm = this._fb.group({
      name: ['', [ <any>Validators.required]],
      date: ['', [ <any>Validators.required]],
      rating: ['', [ <any>Validators.required]],
      brand: ['', [ <any>Validators.required]],
      category: ['', [ <any>Validators.required]],
      image: ['', [ <any>Validators.required]],
      title_image: ['', [ <any>Validators.required]],
      paragraphs: this._fb.array([{
        filename: ['', [ <any>Validators.required]],
        description: ['', [ <any>Validators.required]]
      }]),
      pictures: this._fb.array([
          ''
      ])
    });
  }

  ngOnInit() {}
  open(content, review) {
    console.log(review);
    this.modalForm = this._fb.group({
      name: [review.name, [ <any>Validators.required]],
      date: [review.date, [ <any>Validators.required]],
      rating: [review.rating, [ <any>Validators.required]],
      brand: [review.brand, [ <any>Validators.required]],
      category: [review.category, [ <any>Validators.required]],
      image: [review.image, [ <any>Validators.required]],
      title_image: [review.image, [ <any>Validators.required]],
      paragraphs: this._fb.array(review.page_paragraphs),
      pictures: this._fb.group(review.pictures)
    });
    this.modalService.open(content)
  }

  save(model: Review, isValid: boolean) {
    console.log(model, isValid);
  }
  

  canDeactivate() {
    console.log('i am navigating away');
  }

}
