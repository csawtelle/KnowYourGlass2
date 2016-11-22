"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
var review_service_1 = require('./review.service');
require('rxjs/Rx');
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(app_module_1.AppModule, [review_service_1.ReviewService]);
//# sourceMappingURL=main.js.map