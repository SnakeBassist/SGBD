import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss'],
})
export class TableDetailsComponent implements OnInit {
  database!: any;
  table!: any;
  tableDetails!: any;
  columnsToDelete: any = [];

  tableForm: FormGroup = this.fb.group({
    name: null,
    columns: this.fb.array([]),
  });

  relationsForm: FormGroup = this.fb.group({
    relations: this.fb.array([]),
  });
  dbTables: any = [];
  tableColumns: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private mysql: MysqlService,
    private router: Router
  ) {}

  get columns() {
    return this.tableForm.get('columns') as FormArray;
  }

  get relations() {
    return this.relationsForm.get('relations') as FormArray;
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

      this.tableForm = this.fb.group({
        name: this.table,
        columns: this.fb.array(
          this.tableDetails.map((column: any) =>
            this.fb.group({
              default: column.Default,
              extra: column.Extra,
              field: column.Field,
              key: column.Key,
              null: column.Null,
              type: column.Type,
              originalName: column.Field,
              originalDefault: column.Default,
              originalExtra: column.Extra,
              originalKey: column.Key,
              originalNull: column.Null,
              originalType: column.Type,
            })
          )
        ),
      });

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

      let relations: any = await this.mysql.getRelations(
        this.database,
        this.table
      );

      this.relationsForm = this.fb.group({
        relations: this.fb.array(
          relations.map((relation: any) => {
            const {
              COLUMN_NAME,
              REFERENCED_COLUMN_NAME,
              REFERENCED_TABLE_NAME,
              CONSTRAINT_NAME,
            } = relation;
            return this.fb.group({
              COLUMN_NAME,
              REFERENCED_COLUMN_NAME,
              REFERENCED_TABLE_NAME,
              CONSTRAINT_NAME,
            });
          })
        ),
      });
    }
  }

  addColumn() {
    this.columns.push(
      this.fb.group({
        default: null,
        extra: null,
        field: null,
        key: null,
        null: null,
        type: null,
        isNew: true,
      })
    );
  }

  addRelation() {
    this.relations.push(
      this.fb.group({
        isNew: true,
        TABLE_NAME: this.table,
        COLUMN_NAME: null,
        REFERENCED_COLUMN_NAME: null,
        REFERENCED_TABLE_NAME: null,
        CONSTRAINT_NAME: null,
      })
    );
  }

  async saveRelation(index: any) {
    let relation = this.relations.at(index);
    await this.mysql.createForeignKey(
      this.database,
      this.table,
      relation.value
    );
    this.ngOnInit();
  }

  async removeRelation(index: number) {
    let relation = this.relations.at(index).value;

    if (!relation.isNew) {
      await this.mysql.deleteConstraint(
        this.database,
        this.table,
        relation.CONSTRAINT_NAME
      );
    }

    this.relations.removeAt(index);
  }

  removeColumn(index: number) {
    let column = this.columns.at(index).value;

    if (!column.isNew) {
      this.columnsToDelete.push(column.field);
    }

    this.columns.removeAt(index);
  }

  goBack() {
    this.router.navigate(['main', 'db', this.database]);
  }

  async save() {
    let values = this.tableForm.value;
    if (this.tableDetails) {
      values.toDelete = this.columnsToDelete;
      await this.mysql.updateTable(this.database, this.table, values);
      this.ngOnInit();
    } else {
      await this.mysql.createTable(this.database, values);
    }
    this.router.navigate(['..', values.name], {
      relativeTo: this.activatedRoute,
    });
  }

  async delete() {
    await this.mysql.deleteTable(this.database, this.table);
    this.goBack();
  }
}
