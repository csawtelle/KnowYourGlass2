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
  public response: any;
  public token: any;
 constructor(public tokenService: TokenService, private router: Router, private fb: FormBuilder, public authService: AuthService){
  this.token = '';
  }
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
    console.log("Process form was clicked");
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
