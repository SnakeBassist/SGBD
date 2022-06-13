import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { Subject } from 'rxjs';

const mysql = window.nw.require('mysql2');
const path = window.nw.require('path');
const child_process = window.nw.require('child_process');
const fs = window.nw.require('fs');

@Injectable({
  providedIn: 'root',
})
export class MysqlService {
  private connection: any;

  dbChanges = new Subject();

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private ngZone: NgZone
  ) {}

  connect(data: {
    host: any;
    port: any;
    user: any;
    password: any;
    database: any;
  }) {
    return new Promise((resolve, reject) => {
      let { host, port, user, password, database } = data;

      this.connection = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
      });

      this.connection.getConnection((error: any, connection: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        } else {
          this._snackBar.open('connected', undefined, {
            duration: 3000,
          });
          let routeChain = ['main'];
          if (database) {
            routeChain.push('db');
            routeChain.push(database);
          }
          this.ngZone.run(() => {
            this.router.navigate(routeChain);
          });

          resolve(connection);
        }
      });
    });
  }

  getDatabases() {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query('SHOW DATABASES;', (error: any, result: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  noConnection() {
    this.ngZone.run(() => {
      this.router.navigate(['connect']);
    });
  }

  createDatabase(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        'CREATE DATABASE ' + name + ';',
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            this._snackBar.open('db created', undefined, {
              duration: 3000,
            });
            this.dbChanges.next(result);
            this.ngZone.run(() => {
              this.router.navigate(['main', 'db', name]);
            });

            resolve(result);
          }
        }
      );
    });
  }

  deleteDatabase(name: string | null) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        'DROP DATABASE ' + name + ';',
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            this.dbChanges.next(result);
            this.ngZone.run(() => {
              this.router.navigate(['main']);
            });

            resolve(result);
          }
        }
      );
    });
  }

  renameDB(newName: string, oldName: string | null) {
    if (newName === oldName) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      try {
        let { host, port, user, password } = this.connection.config;

        child_process.execSync(
          `mysqldump --port ${port} -h ${host} -u ${user} -p${password} -R ${oldName} > backup.sql`
        );

        await this.createDatabase(newName);

        child_process.execSync(
          `mysql --port ${port} -h ${host} -u ${user} -p${password} ${newName} < backup.sql`
        );

        await this.deleteDatabase(oldName);

        fs.unlinkSync('backup.sql');

        resolve('ok');
      } catch (error: any) {
        this._snackBar.open('Error: ' + error.message, undefined, {
          duration: 5000,
        });
        reject(error);
      }
    });
  }

  useDB(name: string | null) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query('USE ' + name, async (error: any, result: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  getTables(database: string | null) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        'SHOW TABLES FROM ' + database,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  getTableDetails(database: string | null, table: string | null) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `DESCRIBE ${database}.${table}`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  columnsToSql(columns: any[], modify = false, toDelete: any = null) {
    let sql = modify ? '' : '(';

    if (modify && toDelete) {
      for (let column of toDelete) {
        sql += `DROP COLUMN ${column},`;
      }
    }

    for (let column of columns) {
      if (
        column.isNew ||
        column.originalDefault !== column.default ||
        column.originalExtra !== column.extra ||
        column.originalKey !== column.key ||
        column.originalName !== column.field ||
        column.originalNull !== column.null ||
        column.originalType !== column.type
      ) {
        if (modify) {
          sql += column.isNew
            ? 'ADD '
            : `CHANGE COLUMN ${column.originalName} `;
        }
        sql += `${column.field} ${column.type}`;
        if (column.extra) {
          sql += ` ${column.extra}`;
        }

        if (column.null === 'NO') {
          sql += ` NOT NULL`;
        }

        if (column.default) {
          sql += ` DEFAULT ${column.default}`;
        }

        if (column.key === 'PRI') {
          sql += ' PRIMARY KEY';
        }

        sql += ', ';

        sql = sql.substring(0, sql.length - 2);
        if (!modify) {
          sql += ')';
        }

        if (sql.length < 5) {
          sql = '';
        }
      }
    }

    return sql;
  }

  createTable(database: string | null, values: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `CREATE TABLE ${database}.${values.name} ${this.columnsToSql(
          values.columns
        )}`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  updateTable(database: any, table: any, values: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }

      this.connection.query(
        `ALTER TABLE ${database}.${table} RENAME ${database}.${values.name}`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            this.connection.query(
              `ALTER TABLE ${database}.${values.name} ${this.columnsToSql(
                values.columns,
                true,
                values.toDelete
              )}`,
              (error: any, result: any) => {
                if (error) {
                  this._snackBar.open('Error: ' + error.message, undefined, {
                    duration: 5000,
                  });
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  }

  deleteTable(database: any, table: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `DROP TABLE ${database}.${table}`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  getRelations(database: any, table: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }

      this.connection.query(
        `SELECT
          TABLE_NAME,
          COLUMN_NAME,
          REFERENCED_TABLE_NAME,
          REFERENCED_COLUMN_NAME,
          CONSTRAINT_NAME
        FROM
          information_schema.KEY_COLUMN_USAGE
        WHERE
          CONSTRAINT_SCHEMA = '${database}' AND
          REFERENCED_TABLE_SCHEMA IS NOT NULL AND
          REFERENCED_TABLE_NAME IS NOT NULL AND
          REFERENCED_COLUMN_NAME IS NOT NULL AND TABLE_NAME='${table}'`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  deleteConstraint(database: any, table: any, constraint: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `ALTER TABLE ${database}.${table} DROP FOREIGN KEY ${constraint}`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  createForeignKey(database: any, table: any, data: any) {
    return new Promise(async (resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      const {
        COLUMN_NAME,
        REFERENCED_COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        CONSTRAINT_NAME,
      } = data;
      this.connection.query(
        `ALTER TABLE ${database}.${table} ADD CONSTRAINT ${CONSTRAINT_NAME} FOREIGN KEY (${COLUMN_NAME}) REFERENCES ${REFERENCED_TABLE_NAME}(${REFERENCED_COLUMN_NAME})`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  getViews(database: any) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }

      this.connection.query(
        `SHOW FULL TABLES IN ${database} WHERE TABLE_TYPE LIKE 'VIEW';`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async createView(database: string | null, values: any) {
    for (var v of values.columns){}
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      } this.connection.query('USE ' + database, async (error: any, result: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        } else {
          //toDo change operator values
      this.connection.query(
        `CREATE VIEW ${values.name} AS SELECT ${v.selection} FROM ${database}.${v.from} WHERE ${v.where} ${v.operator} ${v.condition};`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      )};
      });
    },)
  }

  async removeView(database: string, view: any){
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      } this.connection.query(`USE ${database}` , async (error: any, result: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        }
      })
      this.connection.query(`DROP VIEW ${view.name}` , async (error: any, result: any) => {
        if (error) {
          this._snackBar.open('Error: ' + error.message, undefined, {
            duration: 5000,
          });
          reject(error);
        }
      })
    })
  }

  async getUsers(){
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `SELECT user FROM mysql. user;`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async createUser(user: any, host: any, pass:any ){
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `CREATE USER IF NOT EXISTS ${user} @ ${host} IDENTIFIED BY ${pass};`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async removeUser(user: any){
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return this.noConnection();
      }
      this.connection.query(
        `DROP USER ${user};`,
        async (error: any, result: any) => {
          if (error) {
            this._snackBar.open('Error: ' + error.message, undefined, {
              duration: 5000,
            });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }


}
