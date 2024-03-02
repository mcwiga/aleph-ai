import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./home-component/home-component.component').then(x => x.HomeComponentComponent)
    }
  ];
