import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowDetialsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'shows/:id', component: ShowDetialsComponent},
  { path: '**',  pathMatch   : 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
