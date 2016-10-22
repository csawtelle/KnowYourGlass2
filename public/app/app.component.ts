import { Component } from '@angular/core';
@Component({
  selector: 'kyg-app',
  templateUrl: 'views/app.component.html',
/*
  template:`
  <div class="navbar navbar-default navbar-fixed-top">
 <div class="container-fluid">
  <div class="navbar-header">
    <a class="navbar-brand" [routerLink]="['/']">know<strong>yourglass</strong></a>
  </div>

  <div>
   <ul class="nav navbar-nav navbar-right">
    <li>
    <a [routerLink]="['/review']">Review</a>
    </li>
    <li>
    <a [routerLink]="['/admin']">Admin</a>
    </li>
    <li>
    <a [routerLink]="['/login']">Login</a>
    </li>
   </ul>
  </div>
 </div><!-- end container -->
</div><!-- end nav -->
  <div class="jumbotron text-center">
    <h1>Using Template</h1>
    <p>{{ message }}</p>
  </div>
<router-outlet></router-outlet>
  `
*/
})
export class AppComponent { 
  message="Message from component";
}
