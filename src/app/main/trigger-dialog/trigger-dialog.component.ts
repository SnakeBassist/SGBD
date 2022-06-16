import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-trigger-dialog',
  templateUrl: './trigger-dialog.component.html',
  styleUrls: ['./trigger-dialog.component.scss'],
})
export class TriggerDialogComponent implements OnInit {
  triggerText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<TriggerDialogComponent>,
    private mysql: MysqlService
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      this.triggerText = this.data.code;
    }
  }

  async save() {
    await this.mysql.runSql(this.triggerText);
    this.dialogRef.close(true);
  }
}
