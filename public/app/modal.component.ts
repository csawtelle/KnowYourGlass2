import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'modal',
  templateUrl: '../views/modal.html'
})
export class ModalComponent {
  @Input('review') review: Review;  
  @Input('reviewName') reviewName: string;  

  public modalForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private modalService: NgbModal, private _fb: FormBuilder) {}

  ngOnInit() {
    this.modalForm = this._fb.group({
      name: [this.review.name, [ <any>Validators.required]],
      date: [this.review.date, [ <any>Validators.required]],
      rating: [this.review.rating, [ <any>Validators.required]],
      brand: [this.review.brand, [ <any>Validators.required]],
      category: [this.review.category, [ <any>Validators.required]],
      image: [this.review.image, [ <any>Validators.required]]
		});
  } 

  open(content) {
    this.modalService.open(content)
  }

  save(review: Review, isValid: boolean) {
    console.log(review, isValid);
  }
}
