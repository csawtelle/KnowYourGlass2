import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './models/user.interface';
import { Router } from '@angular/router';


@Component({
  selector:'login-page',
  templateUrl: 'views/login.html',
  styles: [`

  .jumbotron { 
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
    background-color: #4c5a6f;
    color:white;
   }
  `]
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(private router: Router) {};

  ngOnInit(){
    this.user = {username: "", password: ""};
  }
  onSubmit(){
    console.log('Are you working?');
    console.log(this.user);
    this.router.navigate(['/admin']);
  }  

}
