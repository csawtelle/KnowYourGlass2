"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home.component');
var review_component_1 = require('./review.component');
var admin_component_1 = require('./admin.component');
var pagenotfound_component_1 = require('./pagenotfound.component');
var login_component_1 = require('./login.component');
var auth_guard_service_1 = require('./auth-guard.service');
var search_component_1 = require('./search.component');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'admin', canActivate: [auth_guard_service_1.AuthGuard], component: admin_component_1.AdminComponent },
    { path: 'review', component: review_component_1.ReviewComponent },
    { path: 'review/:id', component: review_component_1.ReviewComponent },
    { path: 'search', component: search_component_1.SearchComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', component: pagenotfound_component_1.PageNotFoundComponent }
];
exports.AppRouter = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app-routing.module.js.map