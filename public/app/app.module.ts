import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';


import { HomeComponent }   from './home.component';
import { ReviewComponent }   from './review.component';
import { AdminComponent }   from './admin.component';
import { PageNotFoundComponent }   from './pagenotfound.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:  [ 
    BrowserModule,
    AppRoutingModule
  ],

  declarations: [ 
    HomeComponent,
    ReviewComponent,
    AdminComponent,
    PageNotFoundComponent

  ],
  bootstrap:    [ HomeComponent ]
})
export class AppModule { }

