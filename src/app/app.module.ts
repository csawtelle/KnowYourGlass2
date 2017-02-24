import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }   from './app.component';
import { HomeComponent }   from './home.component';
import { ReviewComponent }   from './review.component';
import { AdminComponent }   from './admin.component';
import { PageNotFoundComponent }   from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { SearchComponent } from './search.component';
import { SearchBarComponent } from './search-bar.component';
import { UploaderComponent } from './uploader.component';
import { ReviewService } from './review.service';
import { AppRouter } from './app-routing.module';
import { Review } from './models/review';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { KeysPipe } from './filters/keys.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { SafeHtmlPipe } from './filters/safehtml.pipe';
import { DisqusModule } from './modules/disqus.module';
import { ReviewIndexComponent } from './review-index';
import { BlogsIndexComponent } from './components/blogs_index';
import { BlogService } from './services/blogs.service';
import { BlogSingleComponent } from './components/blogs_single';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { MouseWheelDirective  } from './mouse.directive';

@NgModule({
  imports:  [ 
    DisqusModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    HttpModule,
    NgbModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
    Ng2PageScrollModule.forRoot()
  ],

  declarations: [ 
    AppComponent,
    HomeComponent,
    ReviewComponent,
    AdminComponent,
    PageNotFoundComponent,
    LoginComponent,
    SearchComponent,
    SearchBarComponent,
    UploaderComponent,
    SafeHtmlPipe,
    KeysPipe,
    ReviewIndexComponent,
    BlogsIndexComponent,
    BlogSingleComponent,
    MouseWheelDirective 
 ],

  providers: [ 
    AuthService, 
    ReviewService, 
    AuthGuard,
    BlogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
}

