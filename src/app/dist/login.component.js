"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var auth_service_1 = require('./auth.service');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(router, fb, authService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        //form is built here
        this.form = this.fb.group({
            username: [''],
            password: ['']
        });
        //watch for changes as we validate
        //    this.form.valueChanges.subscribe(data => { console.log(data); });
        //validate each field
        var username = this.form.get('username');
        var password = this.form.get('password');
        if (username.invalid && username.dirty) {
            this.usernameErr = "Please enter a username";
        }
        if (password.invalid && password.dirty) {
            this.passErr = "Please enter a password";
        }
        console.log(this.form);
    };
    LoginComponent.prototype.processForm = function () {
        //    console.log("submit button was clicked", this.form.value);
        //    console.log("The usernameis: ", this.form.value.username);
        this.authService.login(this.form.value);
        this.router.navigate(['/admin']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: '../views/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map