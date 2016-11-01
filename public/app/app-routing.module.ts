import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReviewComponent } from './review.component';
import { AdminComponent }  from './admin.component';
import { PageNotFoundComponent }  from './pagenotfound.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth-guard.service';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
