import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'showDetails',  pathMatch   : 'full', component: ShowDetailsComponent },
  { path: '**',  pathMatch   : 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
