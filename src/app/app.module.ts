// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// modules
import { MaterialModule } from '@modules/material.module';

// root
import { ROUTER_CONFIG } from './app.router.config';
import { AppComponent } from './app.component';

// pages & components
import { HomeComponent } from '@components/pages/home/home.component';
import { NothomeComponent } from '@components/pages/nothome/nothome.component';
import { NavbarComponent } from '@components/parts/navbar/navbar.component';
import { FooterComponent } from '@components/parts/footer/footer.component';

// services
import { DataService } from '@services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NothomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,                       // default
    BrowserAnimationsModule,             // @angular animations (dependency for @angular/material)
    RouterModule.forRoot(ROUTER_CONFIG), // initialize routes (with the config file)
    ReactiveFormsModule,                 // for creating forms in typescript
    FormsModule,                         // for automatically associating forms by angular (dependency for @angular/material)
    HttpClientModule,                    // replacement of HttpModule
    MaterialModule                       // material design components
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
