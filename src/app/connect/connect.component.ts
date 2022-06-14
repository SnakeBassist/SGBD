import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MysqlService } from '../services/mysql.service';

const dotenv = window.nw.require('dotenv');
dotenv.config();

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connectForm!: FormGroup;

  constructor(private fb: FormBuilder, private mysql: MysqlService) {}

  ngOnInit() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 3306,
      DB_USER = 'root',
      DB_PASSWORD = null,
      DB_NAME = null,
      AUTO_CONNECT = null,
    } = window.nw.process.env;
    this.connectForm = this.fb.group({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    if (AUTO_CONNECT) {
      this.submit();
    }
  }

  async submit() {
    await this.mysql.connect(this.connectForm.value);
  }
}
