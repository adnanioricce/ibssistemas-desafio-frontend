import { Routes } from '@angular/router';
import { PersonListComponent  } from "./pages/person-list/person-list.component";
import { PersonComponent } from './pages/person/person.component';
import { PersonCreateComponent } from './pages/person-create/person-create.component';
export const routes: Routes = [
    {path: 'persons',component: PersonListComponent }
    ,{path: 'persons/:id',component: PersonComponent }
    ,{path: 'create/person',component: PersonCreateComponent }
];
