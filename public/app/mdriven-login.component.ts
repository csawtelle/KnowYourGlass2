import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component ({ 
  selector: 'mdriven-login',
  templateUrl: '../views/mdriven-login.html'
})

export class ModelDrivenLogin implements OnInit {
  
  form: FormGroup;
  usernameErr: string;
  passErr: string;
 constructor(private router: Router, private fb: FormBuilder, private authService: AuthService){}
  
  ngOnInit(){
    //form is built here
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });

    //watch for changes as we validate
//    this.form.valueChanges.subscribe(data => { console.log(data); });

    //validate each field
    let username = this.form.get('username');
    let password = this.form.get('password');
    if (username.invalid && username.dirty){
      this.usernameErr = "Please enter a username";
    }
    if (password.invalid && password.dirty){
      this.passErr = "Please enter a password";
    }

    console.log(this.form);
  }
  processForm(){
//    console.log("submit button was clicked", this.form.value);
//    console.log("The usernameis: ", this.form.value.username);
    this.authService.login(this.form.value);
    this.router.navigate(['/admin']);
  }
}
