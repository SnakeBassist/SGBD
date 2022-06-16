import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MysqlService } from 'src/app/services/mysql.service';
import { ProcedureDialogComponent } from '../procedure-dialog/procedure-dialog.component';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss'],
})
export class ProceduresComponent implements OnInit {
  database;
  procedures;

  constructor(private mysql: MysqlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.mysql.currentDb.subscribe((database) => {
      this.database = database;
    });
    setTimeout(() => this.getProcedures(), 500);
  }

  async getProcedures() {
    this.procedures = await this.mysql.getProcedures(this.database);
  }

  async showProcedureCode(name) {
    let code = await this.mysql.getProcedureCode(name);
    this.dialog.open(ProcedureDialogComponent, {
      data: {
        code: code[0]['Create Procedure'],
      },
      height: '80%',
      width: '80%',
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProcedureDialogComponent, {
      data: {
        database: this.database,
      },
      height: '80%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProcedures();
      }
    });
  }
}
