import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReviewComponent } from './review.component';
import { AdminComponent }  from './admin.component';
import { PageNotFoundComponent }  from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth-guard.service';
import { SearchComponent } from './search.component';
import { UploaderComponent } from './uploader.component';
import { ReviewIndexComponent } from './review-index';
import { BlogsIndexComponent } from './components/blogs_index';
import { BlogSingleComponent } from './components/blogs_single';

const appRoutes: Routes = [
  { path: 'admin', /*canActivate: [AuthGuard],*/ component: AdminComponent },
  { path: 'uploader', component: UploaderComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'reviews', component: ReviewsIndexComponent },
  { path: 'blogs', component: BlogsIndexComponent },
  { path: 'blog/:title', component: BlogSingleComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
