import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connect',
    pathMatch: 'full',
  },
  {
    path: 'connect',
    component: ConnectComponent,
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  useHash: true,
});
