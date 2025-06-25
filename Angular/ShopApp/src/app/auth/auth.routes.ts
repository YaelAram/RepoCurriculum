import { Route } from '@angular/router';
import LoginPageComponent from './pages/login-page/login-page.component';
import SignupPageComponent from './pages/signup-page/signup-page.component';

const authRoutes: Route[] = [
  {
    path: 'login',
    title: 'LogIn ItemShop',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    title: 'SignUp ItemShop',
    component: SignupPageComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default authRoutes;
