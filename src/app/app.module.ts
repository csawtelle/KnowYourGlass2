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
import { TokenService } from './token.service';
import { AppRouter } from './app-routing.module';
import { Review } from './models/review';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { KeysPipe } from './filters/keys.pipe';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports:  [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    HttpModule,
    NgbModule.forRoot(),
    CKEditorModule,
    FileUploadModule,
    ReactiveFormsModule 
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
    KeysPipe
 ],

  providers: [ 
    AuthService, 
    ReviewService, 
    AuthGuard,
    TokenService 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
}

