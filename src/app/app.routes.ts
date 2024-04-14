import { Routes } from '@angular/router';
import { PersonListComponent  } from "./pages/person-list/person-list.component";
import { PersonComponent } from './pages/person/person.component';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
// import { SignupComponent } from './pages/auth/signup/signup.component';
export const routes: Routes = [
    {path: '',component: AppComponent,canActivate: [authGuard]}
    ,{path: 'persons',component: PersonListComponent, canActivate:[authGuard] }
    ,{path: 'persons/:id',component: PersonComponent, canActivate:[authGuard] }
    ,{path: 'create/person',component: PersonCreateComponent, canActivate:[authGuard] }
    ,{path: 'auth/login',component: LoginComponent }
    // ,{path: 'auth/signup',component: SignupComponent }
];
