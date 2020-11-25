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
import { ShowDetialsComponent } from './show-details/show-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoaderComponent,
    DashboardComponent,
    ShowDetialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
