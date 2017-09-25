import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

// on direct loading we give export
// if lazy loading we remove export and add forChild method
// export const AUTH_ROUTES: Routes = [
const AUTH_ROUTES: Routes = [
    {
      path: '',
      redirectTo: '/auth/signup',
      pathMatch: 'full'
    },{
      path: 'signup',
      component: SignupComponent
    },{
      path: 'signin',
      component: SigninComponent
    },{
      path: 'logout',
      component: LogoutComponent
    }
];

// for child to denote that its part of file and loaded when needed
// lazy loading
export const authRouting = RouterModule.forChild(AUTH_ROUTES);

/*
  paths entered here are subroutes
  like /auth which redirects to authentication component
  then signup sub component
  so url is /auth/signup

  here in redirectTo if we give /signup
  then it will become localhost:4200/signup
  so we have to give the complete exact path which is /auth/signup

  Here we wont create new Router module as these are the sub routes of the existing router modules so we have to add them as child routes to our main routing file
  so we will export our route constant that is AUTH_ROUTES and import them in the main routing file ie. app.routing.ts
*/
