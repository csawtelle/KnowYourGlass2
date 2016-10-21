import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';

import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';


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
      image: [this.review.image, [ <any>Validators.required]],
      pictures: this._fb.array([
          this.review.pictures
      ])
		});
  } 

  open(content) {
    this.modalService.open(content)
  }

  initPicture() {
    return this._fb.group({
      picture: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addPicture() {
      const control = <FormArray>this.modalForm.controls['pictures'];
      control.push(this.initPicture());
  }

  removePicture(i: number) {
      const control = <FormArray>this.modalForm.controls['pictures'];
      control.removeAt(i);
  }


  save(model: Review, isValid: boolean) {
    console.log(model, isValid);
  }
}
