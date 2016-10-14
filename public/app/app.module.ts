import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { HomeComponent }   from './home.component';
import { ReviewComponent }   from './review.component';
import { AdminComponent }   from './admin.component';
import { PageNotFoundComponent }   from './pagenotfound.component';

import { ReviewService } from './review.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:  [ 
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],

  declarations: [ 
    AppComponent,
    HomeComponent,
    ReviewComponent,
    AdminComponent,
    PageNotFoundComponent

  ],
  providers: [ ReviewService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

