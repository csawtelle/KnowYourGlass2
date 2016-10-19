// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

import { AppComponent }   from './app.component';
import { HomeComponent }   from './home.component';
import { EditComponent }   from './edit-review.component';
import { ReviewComponent }   from './review.component';
import { AdminComponent }   from './admin.component';
import { PageNotFoundComponent }   from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { ReviewService } from './review.service';

import { AppRoutingModule } from './app-routing.module';

import { Review } from './models/review';

@NgModule({
  imports:  [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],

  declarations: [ 
    AppComponent,
    HomeComponent,
    EditComponent,
    ReviewComponent,
    AdminComponent,
    ModalComponent,
    PageNotFoundComponent,
    LoginComponent
  ],

  providers: [ ReviewService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
}

