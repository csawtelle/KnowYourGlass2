import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
//import { ReviewService } from './review.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
//import { AuthService } from './auth.service';

@Component({
  selector: 'admin',
  templateUrl: './views/admin.html',
})
export class AdminComponent implements OnInit{
  public newPost = 0;
  public alertType = "info";
  public modalForm: FormGroup;
  public submitted: boolean;
  public reviews: any;
  public modalRef: any;
  public response: any;
  public oldName: any;
  public varinadmin: any;
  public token: any;
  constructor(
    authService: AuthService, 
    reviewService: ReviewService, 
    public modalService: NgbModal, 
    public _fb: FormBuilder
  ) {
      this.reviewService.getReviews().subscribe(reviews => this.reviews = reviews);
      this.authService.getToken('Gerry Ramos', 'admin').subscribe(response => this.token = response.token);
  }
  ngOnInit(){}

  private list = {
    'brands': [
      {'text': 'Nikon', 'value': 'Nikon'},
      {'text': 'Canon', 'value': 'Canon'},
      {'text': 'Sigma', 'value': 'Sigma'},
    ],
    'categories': [
      {'text': '8-24mm Ultra Wide Angle', 'value': '8-24mm Ultra Wide Angle'},
      {'text': '24-35mm Wide Angle', 'value': '24-35mm Wide Angle'},
      {'text': '35-85mm Standard', 'value': '35-85mm Standard'},
      {'text': '85-135mm Short Telephoto', 'value': '85-135mm Short Telephoto'},
      {'text': '135-300mm Medium Telephoto', 'value': '135-300mm Medium Telephoto'},
      {'text': '300mm+ Super Telephoto', 'value': '300mm+ Super Telephoto'}
    ],
    'sensors': [
      {'text': 'Crop', 'value': 'Crop'},
      {'text': 'Full Frame', 'value': 'Full Frame'}
    ],
    'ratings': [
      {'text': '0 Stars', 'value': 'rating0'},
      {'text': '1 Star', 'value': 'rating1'},
      {'text': '2 Stars', 'value': 'rating2'},
      {'text': '3 Stars', 'value': 'rating3'},
      {'text': '4 Stars', 'value': 'rating4'},
      {'text': '5 Stars', 'value': 'rating5'},
      {'text': '6 Stars', 'value': 'rating6'},
      {'text': '7 Stars', 'value': 'rating7'},
      {'text': '8 Stars', 'value': 'rating8'},
      {'text': '9 Stars', 'value': 'rating9'},
      {'text': '10 Stars', 'value': 'rating10'}
    ]
  }

  openNew(content: Object) {
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
    console.log(this.token);
    console.log(this.authService.token);
    this.modalRef = this.modalService.open(content);
  }

  openOld(content: Object, review: Review) {
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

  deleteReview(name: string) {
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
