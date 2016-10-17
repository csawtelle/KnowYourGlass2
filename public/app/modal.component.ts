import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'modal',
  templateUrl: '../views/modal.html'
})
export class ModalComponent {
  closeResult: string;
  reviews: Review[];

  constructor(private modalService: NgbModal, private reviewService: ReviewService) {}
  open(content) {
    this.reviewService.reviews.subscribe((observer) => {
      this.reviews = JSON.parse(observer._body).data;
      console.log(this.reviews);
    });
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
