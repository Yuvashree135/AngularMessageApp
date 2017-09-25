import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component'
import { AuthenticationComponent } from './users/authentication.component'
// on lazy loading no need to import as we use forChild method
// import { AUTH_ROUTES } from './users/auth.routing';

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
  // we use this on exporting the child route
  // {
  //   path: 'auth',
  //   component: AuthenticationComponent,
  //   children: AUTH_ROUTES
  // }
  // if forChild() method
  // lazy loading
  // loadChildren takes a string input ; the path to the auth module which just points to the route and it wont load instantly
  // #AuthModule is the class name
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: './users/auth.module#AuthModule'
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);

/* use the absolute path in redirect to else it will get appended to the existing path
 redirectTo='/messages' is correct
 redirectTo='messages' is wrong
 pathMatch is exact; so that it matches the exact url
 */
