import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EditComponent } from './edit-review.component';
import { ReviewComponent } from './review.component';
import { AdminComponent }  from './admin.component';
import { PageNotFoundComponent }  from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { SinglePostComponent } from './singlepost.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'admin/:title', component: SinglePostComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
