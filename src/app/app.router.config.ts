import { Route } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BacklogComponent } from './components/pages/backlog/backlog.component';
import { DoingComponent } from './components/pages/doing/doing.component';


export const ROUTER_CONFIG: Route[] = [
  {
    path: '',
    component: HomeComponent,
    data: { depth: 1 }
  },
  {
    path: 'backlog',
    component: BacklogComponent,
    data: { depth: 2 }
  },
  {
    path: 'doing',
    component: DoingComponent,
    data: { depth: 3 }
  }
  // {
  //   path: '',
  //   component: HomeComponent,
  //   data: { depth: 1 }
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: { depth: 2 },
  //   //TODO: canActivate: [ GuestGuard ],
  // },
  // {
  //   path: 'profile',
  //   redirectTo: '404',
  //   pathMatch: 'full',
  //   data: { depth: 3 }
  // },
  // {
  //   path: 'profile/:id',
  //   component: ProfileComponent,
  //   data: { depth: 2 }
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  //   data: { depth: 4 },
  //   canActivate: [ AuthGuard ],
  //   children: [
  //     { path: '', redirectTo: 'personalize', pathMatch: 'full' },
  //     { path: 'personalize', component: PersonalizeSettingsComponent },
  //     { path: 'profile', component: ProfileSettingsComponent },
  //     { path: 'security', component: SecuritySettingsComponent },
  //     { path: 'interests', component: InterestsSettingsComponent },
  //     { path: 'homepage', component: HomepageSettingsComponent },
  //     { path: 'navigation', component: NavigationSettingsComponent },
  //     { path: 'analyze', component: AnalyzeSettingsComponent }
  //   ]
  // },
  // { path: '404', component: PageNotFoundComponent, data: { depth: 6 } },
  // { path: '**', redirectTo: '404', pathMatch: 'full' }

  // // , canActivate: [AuthGuard]
];





