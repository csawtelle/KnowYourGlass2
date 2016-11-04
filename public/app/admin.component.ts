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
  }

  ngOnInit() {
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
    });
  }

  openNew(content) {
    this.modalForm = this._fb.group({
      name: ['', [ <any>Validators.required]],
      date: ['', [ <any>Validators.required]],
      rating: ['', [ <any>Validators.required]],
      brand: ['', [ <any>Validators.required]],
      category: ['', [ <any>Validators.required]],
      image: ['', [ <any>Validators.required]],
      title_image: ['', [ <any>Validators.required]],
      paragraphs: this._fb.array([]),
      pictures: this._fb.array([])
    });
    this.modalService.open(content)
  }

  openOld(content, review) {
    this.modalForm = this._fb.group({
      name: [review.name, [ <any>Validators.required]],
      date: [review.date, [ <any>Validators.required]],
      rating: [review.rating, [ <any>Validators.required]],
      brand: [review.brand, [ <any>Validators.required]],
      category: [review.category, [ <any>Validators.required]],
      image: [review.image, [ <any>Validators.required]],
      title_image: [review.image, [ <any>Validators.required]],
      paragraphs: this._fb.array(review.page_paragraphs),
      pictures: this._fb.array([])
    });
    const control = <FormArray>this.modalForm.controls['pictures'];
    for (let picture of review.pictures) {
        control.push(
          this._fb.group({
            filename: [picture.filename],
            description: [picture.description]
          })
        );
    }
 
    this.modalService.open(content)
  }

  addParagraph() {
    const control = <FormArray>this.modalForm.controls['paragraphs'];
    control.push(new FormControl(''));
  }

  addPicture() {
    const control = <FormArray>this.modalForm.controls['pictures'];
    control.push(this._fb.group({
      filename: '',
      description: ''
    }));
  }

  deletePost(name) {
    this.reviewService.deleteReview(name);
  }

  save(model: Review, isValid: boolean) {
    this.reviewService.putReview(model);
  }
  

  canDeactivate() {
    console.log('i am navigating away');
  }

}
