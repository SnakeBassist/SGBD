import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MysqlService } from 'src/app/services/mysql.service';
import { TriggerDialogComponent } from '../trigger-dialog/trigger-dialog.component';

@Component({
  selector: 'app-triggers',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class TriggersComponent implements OnInit {
  @Input('database') database;
  triggers;

  constructor(private mysql: MysqlService, public dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => this.getTriggers(), 500);
  }

  async getTriggers() {
    this.triggers = await this.mysql.getTriggers(this.database);
  }

  async showTriggerCode(name) {
    let code = await this.mysql.getTriggerCode(name);
    console.log(code);
    this.dialog.open(TriggerDialogComponent, {
      data: {
        code: code[0]['SQL Original Statement'],
      },
      height: '80%',
      width: '80%',
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TriggerDialogComponent, {
      data: {
        database: this.database,
      },
      height: '80%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTriggers();
      }
    });
  }
}
