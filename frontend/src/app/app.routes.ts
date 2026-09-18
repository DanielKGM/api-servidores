import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'secretarias',
  },
  {
    path: 'secretarias',
    loadComponent: () =>
      import('./features/secretarias/pages/secretaria-list/secretaria-list').then(
        (component) => component.SecretariaListComponent,
      ),
  },
  {
    path: 'secretarias/novo',
    loadComponent: () =>
      import('./features/secretarias/pages/secretaria-form/secretaria-form').then(
        (component) => component.SecretariaFormComponent,
      ),
  },
  {
    path: 'secretarias/:id/editar',
    loadComponent: () =>
      import('./features/secretarias/pages/secretaria-form/secretaria-form').then(
        (component) => component.SecretariaFormComponent,
      ),
  },
  {
    path: 'servidores',
    loadComponent: () =>
      import('./features/servidores/pages/servidor-list/servidor-list').then(
        (component) => component.ServidorListComponent,
      ),
  },
  {
    path: 'servidores/novo',
    loadComponent: () =>
      import('./features/servidores/pages/servidor-form/servidor-form').then(
        (component) => component.ServidorFormComponent,
      ),
  },
  {
    path: 'servidores/:id/editar',
    loadComponent: () =>
      import('./features/servidores/pages/servidor-form/servidor-form').then(
        (component) => component.ServidorFormComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'secretarias',
  },
];
