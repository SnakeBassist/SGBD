import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { MysqlService } from '../../services/mysql.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  database!: any;
  view!: any;
  dbTables: any = [];
  tableColumns: any = {};
  tableDetails!: any;
  table!: any;

  viewForm: FormGroup = this.fb.group ({
    name: null,
    columns: this.fb.array ([])
  })

  goBack() {
    this.router.navigate(['main', 'db', this.database]);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mysql: MysqlService,
    private fb: FormBuilder
  ) { }

  get columns() {
    return this.viewForm.get('columns') as FormArray;
  }

  async ngOnInit() {

    let snapshot = this.activatedRoute.snapshot.paramMap;
    this.database = snapshot.get('name');
    this.table = snapshot.get('table');

    if (this.table !== '--new--') {
      this.tableDetails = await this.mysql.getTableDetails(
        this.database,
        this.table
      );

    this.viewForm = this.fb.group({
      name: this.table,
      columns: this.fb.array(
        this.tableDetails.map((column: any) =>
          this.fb.group({
            selection: column.Selection,
            from: column.From,
            where: column.Where,
            operator: column.Operator,
            condition: column.Condition
          })
        )
      ),
    });
  }

  let tables: any = await this.mysql.getTables(this.database);

      this.dbTables = tables.map((table: any) => {
        let name: any = Object.values(table)[0];
        return {
          name,
        };
      });
      for (let table of this.dbTables) {
        let columns = await this.mysql.getTableDetails(
          this.database,
          table.name
        );
        this.tableColumns[table.name] = columns;
      }
}

  addView() {
    this.columns.push(
      this.fb.group({
        selection: null,
        from: null,
        where: null,
        operator: null,
        condition: null,
        isNew: true,
      })
    );
  }

  removeView (index: number) {

  }

  async save() {
    let values = this.viewForm.value;
    this.mysql.createView(this.database, values);
    this.router.navigate(['main', 'db', this.database]);
  }

  async delete() {
    this.mysql.removeView(this.database, this.viewForm.value);
    this.router.navigate([".."]), {
    relativeTo: this.activatedRoute,
    }
  }

}

