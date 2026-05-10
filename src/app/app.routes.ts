import { Routes } from '@angular/router';
import { ListarCasosComponent } from './pages/listar-casos/listar-casos.component';

export const routes: Routes = [
  { path: 'casos', component: ListarCasosComponent },
  { path: '', redirectTo: 'casos', pathMatch: 'full' }
];
