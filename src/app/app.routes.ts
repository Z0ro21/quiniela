import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PredicComponent } from './components/predic/predic.component';

const APP_ROUTES: Routes = [
    { path: '', component: MainComponent },
    { path: 'predic/:id', component: PredicComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'formulario' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
