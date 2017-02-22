import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component ({ 
  selector: 'login',
  templateUrl: './views/login.html'
})

export class LoginComponent implements OnInit {
  accountForm: FormGroup;
  verificationForm: FormGroup;
  usernameErr: string;
  passErr: string;
  emailErr: string;
  tempPassErr: string;
  persistPassErr: string;
  registered: boolean = true;
  verifying: boolean = false;
  user: Observable<any>;
  userExists: boolean = false;
  private searchTerms = new Subject<string>();
  term: any;
  public response: any;
  public token: any;
 
  constructor(public tokenService: TokenService, private router: Router, private fb: FormBuilder, public authService: AuthService){
    this.user = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term.length > 0 ? this.authService.accountSearch(term): Observable.of<any>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<any>([]);
      });
      
      this.token = '';
  }

  existingUserSearch(search: string): void {
    this.searchTerms.next(search);
    this.user.subscribe(result => {
      if(result.success = false) {
        this.userExists = false
      } else {
        this.userExists = true
      }    
    });
  }

  ngOnInit(){
    //form is built here
    this.accountForm = this.fb.group({
      username: [''],
      password: [''],
      email: ['']
    });
    //watch for changes as we validate
    this.accountForm.valueChanges.subscribe(data => { 
      let username = this.accountForm.get('username');
      let password = this.accountForm.get('password');
      let email = this.accountForm.get('email');
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
    if(registered) {
      this.registered = false;
    } else {
      this.registered = true;
    }
  }
  processAccountForm() {
    if (this.registered) {
      this.token = "Logging in...";
      this.tokenService.getToken(this.accountForm.value.username, this.accountForm.value.password);
      this.tokenService.loginDelay().subscribe(() => {
        if (this.tokenService.currentToken) {
          this.token = "Login Success! Redirecting";
          this.router.navigate(['/admin']);
        }
      });
    } else if(!this.registered && !this.userExists) {
      this.authService.register(this.accountForm.value.username, this.accountForm.value.email).subscribe(response => this.response = response);
      this.verificationForm = this.fb.group({
        username: this.accountForm.value.username,
        email: this.accountForm.value.email,
        tempPassword: [''],
        persistPassword: ['']
      });
      //watch for changes as we validate
      this.verificationForm.valueChanges.subscribe(data => { 
        let username = this.verificationForm.get('username');
        let tempPassword = this.verificationForm.get('tempPassword');
        let persistPassword = this.verificationForm.get('persistPassword');
        let email = this.verificationForm.get('email');

       if (username.invalid && username.dirty){
          this.usernameErr = "Please enter a username";
        } else {
          this.usernameErr = null;
        }
        if (tempPassword.invalid && tempPassword.dirty){
          this.tempPassErr = "Please enter a password";
        } else {
          this.tempPassErr = null;
        }
        if (persistPassword.invalid && persistPassword.dirty){
          this.persistPassErr = "Please enter a password";
        } else {
          this.persistPassErr = null;
        }
        if (email.invalid && email.dirty){
          this.emailErr = "Please enter an Email";
        } else {
          this.emailErr = null;
        }
      });
      this.verifying = true;
    } else {}
  }
  
  processVerificationForm() {
    this.authService.confirmRegister(
      this.verificationForm.value.username, 
      this.verificationForm.value.tempPassword, 
      this.verificationForm.value.persistPassword, 
      this.verificationForm.value.email
    ).subscribe(response => this.response = response);

    this.router.navigate(['/admin']);
  } 
}
