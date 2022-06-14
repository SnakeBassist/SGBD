import { Component, OnInit, ViewChild } from '@angular/core';
import { MysqlService } from 'src/app/services/mysql.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backup-details',
  templateUrl: './backup-details.component.html',
  styleUrls: ['./backup-details.component.scss'],
})
export class BackupDetailsComponent implements OnInit {
  constructor(private dbService: MysqlService) {}

  database;
  file;

  @ViewChild('save') save;
  @ViewChild('restoreFile') restoreFile;

  ngOnInit(): void {
    this.dbService.currentDb.subscribe(
      (database) => (this.database = database)
    );
  }

  createBackup() {
    this.save.nativeElement.click();
  }

  openFileDialog() {
    this.restoreFile.nativeElement.click();
  }

  async backup(event) {
    await this.dbService.createBackup(this.database, event.target.value);
  }

  async restore(event) {
    await this.dbService.restoreBackup(this.database, event.target.value);
    this.dbService.restored.next(Math.random());
  }
}
