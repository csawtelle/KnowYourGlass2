import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { EditComponent }      from './edit-review.component';
import { ReviewComponent }      from './review.component';
import { AdminComponent }  from './admin.component';
import { PageNotFoundComponent }  from './pagenotfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'edit', component: EditComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'admin',     component: AdminComponent },
  { path: '**',     component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
