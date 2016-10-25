import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SinglePostComponent } from './singlepost.component';
import { AppComponent }   from './app.component';
import { HomeComponent }   from './home.component';
import { EditComponent }   from './edit-review.component';
import { ReviewComponent }   from './review.component';
import { AdminComponent }   from './admin.component';
import { PageNotFoundComponent }   from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { ReviewService } from './review.service';
import { AppRouter } from './app-routing.module';
import { Review } from './models/review';
import { PostService } from './services/post.service';
@NgModule({
  imports:  [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule 
  ],

  declarations: [ 
    AppComponent,
    HomeComponent,
    EditComponent,
    ReviewComponent,
    AdminComponent,
    PageNotFoundComponent,
    LoginComponent,
    SinglePostComponent
 ],

  providers: [ ReviewService, PostService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
}

