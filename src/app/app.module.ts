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
import { CardComponent } from './components/parts/card/card.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { TeamSelectorComponent } from './components/parts/team-selector/team-selector.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { CardListComponent } from './components/parts/card-list/card-list.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { DialogComponent } from './components/parts/dialog/dialog.component';
import { DialogContentHelpComponent } from './components/parts/dialog/dialog-content-help/dialog-content-help.component';
import { DialogContentCardComponent } from './components/parts/dialog/dialog-content-card/dialog-content-card.component';
import { DialogContentPersonComponent } from './components/parts/dialog/dialog-content-person/dialog-content-person.component';
import { DialogContentTeamComponent } from './components/parts/dialog/dialog-content-team/dialog-content-team.component';

// services
import { LeankitService } from './services/leankit.service';
import { DataService } from './services/data.service';
import { TeamService } from './services/team.service';
import { ContactService } from './services/contact.service';

// pipes
import { BeautifyDatePipe } from './pipes/beautify-date.pipe';
import { FilterOnKeyIsValuePipe } from './pipes/filter-on-key-is-value.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { SanitizeCssPipe } from './pipes/sanitize-css.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NavItemsComponent,
    BacklogComponent,
    DoingComponent,
    CardComponent,
    LoadingComponent,
    BeautifyDatePipe,
    TeamSelectorComponent,
    HeaderComponent,
    CardListComponent,
    PageNotFoundComponent,
    DialogComponent,
    DialogContentHelpComponent,
    DialogContentCardComponent,
    DialogContentPersonComponent,
    FilterOnKeyIsValuePipe,
    SanitizeHtmlPipe,
    SanitizeCssPipe,
    DialogContentTeamComponent
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
  providers: [ LeankitService, DataService, TeamService, ContactService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ DialogComponent ]
})
export class AppModule { }
