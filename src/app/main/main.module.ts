import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseDetailsComponent } from './database-details/database-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TableDetailsComponent } from './table-details/table-details.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BackupDetailsComponent } from './backup-details/backup-details.component';
import { SelectDetailsComponent } from './select-details/select-details.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProcedureDialogComponent } from './procedure-dialog/procedure-dialog.component';
import { TriggersComponent } from './triggers/trigger.component';
import { TriggerDialogComponent } from './trigger-dialog/trigger-dialog.component';

@NgModule({
  declarations: [
    MainScreenComponent,
    DatabaseDetailsComponent,
    TableDetailsComponent,
    ViewDetailsComponent,
    UserDetailsComponent,
    BackupDetailsComponent,
    SelectDetailsComponent,
    ProceduresComponent,
    ProcedureDialogComponent,
    TriggersComponent,
    TriggerDialogComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class MainModule {}
