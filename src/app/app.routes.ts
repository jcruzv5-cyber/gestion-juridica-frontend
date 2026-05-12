import { Routes } from '@angular/router';
import { RegistrarCliente } from './pages/registrar-cliente/registrar-cliente';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes/registrar', pathMatch: 'full' },
  { path: 'clientes/registrar', component: RegistrarCliente }
];
