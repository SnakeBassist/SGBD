import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connectForm!: FormGroup;

  constructor(private fb: FormBuilder, private mysql: MysqlService) {}

  ngOnInit() {
    this.connectForm = this.fb.group({
      host: '192.168.64.2',
      port: 3306,
      user: 'admin',
      password: '12345',
      database: null,
    });
  }

  async submit() {
    await this.mysql.connect(this.connectForm.value);
  }
}
