import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

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
  public editorContent: string;
  constructor(
    private authService: AuthService, 
    private reviewService: ReviewService, 
    public modalService: NgbModal, 
    public _fb: FormBuilder
  ) {
      this.reviewService.getReviews().subscribe(reviews => this.reviews = reviews);
//      this.authService.getToken('Gerry Ramos', 'admin').subscribe(response => this.token = response.token);
      this.token = this.authService.grabToken();
      console.log("1 token from admin is: " + this.token.token);

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
      title_image: ['', [ <any>Validators.required]],
      sensor: ['', [ <any>Validators.required]],
      content: ['', [ <any>Validators.required]]
    });
    this.modalRef = this.modalService.open(content);
    console.log(this.token);
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
      sensor: [review.sensor, [ <any>Validators.required]],
      title_image: [review.title_image, [ <any>Validators.required]],
      content: [review.content, [ <any>Validators.required]]
    });
    this.editorContent = review.content;
    this.modalRef = this.modalService.open(content);
    console.log("token from admin is: " + this.token);
  }

  deleteReview(name: string) {
    this.reviewService.deleteReview(name).subscribe(response => this.response = response);
  }

  save(model: Review, isValid: boolean) {
    console.log(model);
    model.content = this.editorContent;
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

  onBlur() {
    console.log("You stopped touching it");
  }

  onReady() {
    console.log("Pizzas ready");
  }

  onFocus() {
    console.log("You touched it");
  }

  onChange(content: string) {
    this.editorContent = content;
    console.log(this.editorContent);
  }
}
