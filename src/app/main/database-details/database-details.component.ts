import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.scss'],
})
export class DatabaseDetailsComponent implements OnInit {
  databaseForm: FormGroup = this.fb.group({
    name: '',
  });
  database!: any;
  databaseName;
  views: any = [];
  tables: any = [];

  sql;
  sqlResult;
  tableHeaders;

  constructor(
    private fb: FormBuilder,
    private mysql: MysqlService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    this.mysql.currentDb.subscribe(
      (database) => (this.databaseName = database)
    );
    this.mysql.restored.subscribe(async () => {
      let tables = (await this.mysql.getTables(this.databaseName)) as any[];

      this.tables = tables.map((tableData) => {
        return { name: Object.values(tableData)[0] };
      });
    });
    try {
      this.databaseName = this.activatedRoute.snapshot.paramMap.get('name');
      if (this.databaseName !== '--new--') {
        this.database = await this.mysql.useDB(this.databaseName);

        let tables = (await this.mysql.getTables(this.databaseName)) as any[];

        this.tables = tables.map((tableData) => {
          return { name: Object.values(tableData)[0] };
        });

        this.databaseForm = this.fb.group({
          name: this.databaseName,
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      this.databaseName = this.activatedRoute.snapshot.paramMap.get('name');
      if (this.databaseName !== '--new--') {
        this.database = await this.mysql.useDB(this.databaseName);

        let views = (await this.mysql.getViews(this.databaseName)) as any[];

        this.views = views.map((tableData) => {
          return { name: Object.values(tableData)[0] };
        });

        this.databaseForm = this.fb.group({
          name: this.databaseName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    const { name } = this.databaseForm.value;
    if (this.database) {
      this.mysql.renameDB(
        name,
        this.activatedRoute.snapshot.paramMap.get('name')
      );
    } else {
      this.mysql.createDatabase(name);
    }
  }

  delete() {
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    this.mysql.deleteDatabase(name);
  }

  openTable(database: string | null, table: string = '--new--') {
    this.ngZone.run(() => {
      this.router.navigate(['db', database, 'table', table], {
        relativeTo: this.activatedRoute.parent,
      });
    });
  }

  openView(database: string | null, view: string = '--new--') {
    this.ngZone.run(() => {
      this.router.navigate(['db', database, 'view', view], {
        relativeTo: this.activatedRoute.parent,
      });
    });
  }

  async runSql() {
    let result: any = await this.mysql.runSql(this.sql);
    this.sqlResult = result;
    if (result.length) {
      this.tableHeaders = Object.keys(result[0]);
    } else {
      this.tableHeaders = [];
    }
  }
}
