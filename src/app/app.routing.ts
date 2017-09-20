import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component'
import { AuthenticationComponent } from './users/authentication.component'
import { AUTH_ROUTES } from './users/auth.routing';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/messages',
    pathMatch: 'full'
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: AUTH_ROUTES
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);

/* use the absolute path in redirect to else it will get appended to the existing path
 redirectTo='/messages' is correct
 redirectTo='messages' is wrong
 pathMatch is exact; so that it matches the exact url
 */
