import { Route } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BacklogComponent } from './components/pages/backlog/backlog.component';
import { DoingComponent } from './components/pages/doing/doing.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';


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
  },
  { path: '404', component: PageNotFoundComponent, data: { depth: 6 } },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];





