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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home.component');
var review_component_1 = require('./review.component');
var admin_component_1 = require('./admin.component');
var pagenotfound_component_1 = require('./pagenotfound.component');
var login_component_1 = require('./login.component');
var review_service_1 = require('./review.service');
var app_routing_module_1 = require('./app-routing.module');
var auth_guard_service_1 = require('./auth-guard.service');
var auth_service_1 = require('./auth.service');
var keys_pipe_1 = require('./filters/keys.pipe');
var search_component_1 = require('./search.component');
var search_bar_component_1 = require('./search-bar.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRouter,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                review_component_1.ReviewComponent,
                admin_component_1.AdminComponent,
                pagenotfound_component_1.PageNotFoundComponent,
                login_component_1.LoginComponent,
                search_component_1.SearchComponent,
                search_bar_component_1.SearchBarComponent,
                keys_pipe_1.KeysPipe
            ],
            providers: [
                auth_service_1.AuthService,
                review_service_1.ReviewService,
                auth_guard_service_1.AuthGuard
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map