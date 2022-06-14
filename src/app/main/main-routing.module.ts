import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseDetailsComponent } from './database-details/database-details.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { SelectDetailsComponent } from './select-details/select-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

const routes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
    children: [
      {
        path: 'db/:name',
        component: DatabaseDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'db/:name/table/:table',
        component: TableDetailsComponent,
      },
      {
        path: 'db/:name/view/:table',
        component: ViewDetailsComponent
      },
      {
        path: 'db/name/select/:table',
        component: SelectDetailsComponent
      },
      {
        path: 'usr/:user',
        component: UserDetailsComponent,
        pathMatch: 'full',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
