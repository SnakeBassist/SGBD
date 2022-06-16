import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.scss'],
})
export class ProcedureDialogComponent implements OnInit {
  procedureText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ProcedureDialogComponent>,
    private mysql: MysqlService
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      this.procedureText = this.data.code;
    }
  }

  async save() {
    await this.mysql.runSql(this.procedureText);
    this.dialogRef.close(true);
  }
}
