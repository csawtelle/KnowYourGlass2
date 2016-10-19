import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Component({
  selector: 'modal',
  templateUrl: '../views/modal.html'
})
export class ModalComponent {
  @Input('review') review: Array<string>;  
  @Input('reviewName') reviewName: string;  

  closeResult: string;

  constructor(private modalService: NgbModal, private reviewService: ReviewService) {}
  open(content) {
    this.modalService.open(content).result.then((result) => {
//      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
//      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason)
  }
}
