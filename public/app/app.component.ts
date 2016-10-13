import { Component } from '@angular/core';

@Component({
  selector: 'kyg-app',
  template: `
    <a [routerLink]="['/home']">Home</a>
    <a [routerLink]="['/review']">Review</a>
    <a [routerLink]="['/admin']">Admin</a>
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
