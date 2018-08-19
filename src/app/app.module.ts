// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// modules
import { MaterialModule } from './modules/material.module';

// root
import { ROUTER_CONFIG } from './app.router.config';
import { AppComponent } from './app.component';

// pages & components
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/parts/navbar/navbar.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { NavItemsComponent } from './components/parts/navbar/nav-items/nav-items.component';
import { BacklogComponent } from './components/pages/backlog/backlog.component';
import { DoingComponent } from './components/pages/doing/doing.component';

// services
import { LeankitService } from './services/leankit.service';
import { DataService } from './services/data.service';

// pipes
import { FilterPipe } from './pipes/filter.pipe';
import { FilterOnKeyPipe } from './pipes/filter-on-key.pipe';
import { FilterCardsFromLanePipe } from './pipes/filter-cards-from-lane.pipe';
import { CardListComponent } from './components/parts/card-list/card-list.component';
import { CardComponent } from './components/parts/card/card.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { BeautifyDatePipe } from './pipes/beautify-date.pipe';
import {TeamService} from './services/team.service';
import { TeamSelectorComponent } from './components/parts/team-selector/team-selector.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { CardListWithContainerComponent } from './components/parts/card-list-with-container/card-list-with-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NavItemsComponent,
    BacklogComponent,
    DoingComponent,
    CardListComponent,
    FilterPipe,
    FilterOnKeyPipe,
    FilterCardsFromLanePipe,
    CardComponent,
    LoadingComponent,
    BeautifyDatePipe,
    TeamSelectorComponent,
    HeaderComponent,
    CardListWithContainerComponent
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
  providers: [ LeankitService, DataService, TeamService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
