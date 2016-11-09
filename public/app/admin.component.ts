import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'admin',
  templateUrl: '../views/admin.html'
})
export class AdminComponent implements OnInit{
  public newPost = 0;
  public alertType = "info";
  public modalForm: FormGroup;
  public submitted: boolean;
  public reviews;
  public modalRef;
  public response;
  public oldName;

  constructor(
    private authService: AuthService, 
    public reviewService: ReviewService, 
    public modalService: NgbModal, 
    public _fb: FormBuilder
  ) {
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
    });
  }
  ngOnInit(){}

  openNew(content) {
    this.newPost = 1;
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

    this.modalRef = this.modalService.open(content);
  }

  openOld(content, review) {
    this.newPost = 0;
    this.oldName = review.name;
    this.modalForm = this._fb.group({
      name: [review.name, [ <any>Validators.required]],
      date: [review.date, [ <any>Validators.required]],
      rating: [review.rating, [ <any>Validators.required]],
      brand: [review.brand, [ <any>Validators.required]],
      category: [review.category, [ <any>Validators.required]],
      image: [review.image, [ <any>Validators.required]],
      title_image: [review.image, [ <any>Validators.required]],
      paragraphs: this._fb.array(review.paragraphs),
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
 
    this.modalRef = this.modalService.open(content);
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

  deleteReview(name) {
    this.reviewService.deleteReview(name).subscribe(response => this.response = response);
  }

  save(model: Review, isValid: boolean) {
    if(this.newPost) {
      this.reviewService.postReview(model).subscribe(response => this.response = response);
    } else {
      this.reviewService.putReview(this.oldName, model).subscribe(response => this.response = response);
    }
    this.modalRef.close();
  }

  canDeactivate() {
    console.log('i am navigating away');
  }

}
