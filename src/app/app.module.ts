import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyHttpInterceptor } from './interceptor/http.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoaderComponent,
    DashboardComponent,
    ShowDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
