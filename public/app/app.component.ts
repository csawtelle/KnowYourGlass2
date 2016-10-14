import { Component } from '@angular/core';

@Component({
  selector: 'kyg-app',
  template: `
    <a [routerLink]="['/']">Home</a>
    <a [routerLink]="['/review']">Review</a>
    <a [routerLink]="['/admin']">Admin</a>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `
  /* templateUrl: 'views/toolbar.html' */
})
export class AppComponent { }
