import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
@Component ({ 
  selector: 'login',
  templateUrl: './views/login.html'
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  usernameErr: string;
  passErr: string;
  emailErr: string;
  registered: boolean = true;
  public response: any;
  public token: any;
 
  constructor(public tokenService: TokenService, private router: Router, private fb: FormBuilder, public authService: AuthService){
    this.token = '';
  }

  ngOnInit(){
    //form is built here
    this.form = this.fb.group({
      username: [''],
      password: [''],
      email: ['']
    });
    //watch for changes as we validate
    this.form.valueChanges.subscribe(data => { 
      let username = this.form.get('username');
      let password = this.form.get('password');
      let email = this.form.get('email');
      if (username.invalid && username.dirty){
        this.usernameErr = "Please enter a username";
      } else {
        this.usernameErr = null;
      }
      if (password.invalid && password.dirty){
        this.passErr = "Please enter a password";
      } else {
        this.passErr = null;
      }
       if (email.invalid && email.dirty){
        this.emailErr = "Please enter an Email";
      } else {
        this.emailErr = null;
      }
    });
  }

  swapForm(registered: boolean){
    console.log(registered);
    console.log(this.registered);
    if(registered) {
      this.registered = false;
    } else {
      this.registered = true;
    }
  }
  processForm(){
    this.token = "Logging in...";
    this.tokenService.getToken(this.form.value.username, this.form.value.password);
    this.tokenService.loginDelay().subscribe(() => {
      if (this.tokenService.currentToken) {
        this.token = "Login Success! Redirecting";
        this.router.navigate(['/admin']);
      }
    }); 
  }
}
