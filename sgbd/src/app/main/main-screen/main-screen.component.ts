import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  databases: any = [];
  users: any = [];

  constructor(
    private mysql: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    this.databases = await this.mysql.getDatabases();

    this.mysql.dbChanges.subscribe(async (change) => {
      this.databases = await this.mysql.getDatabases();
    });

    this.users = await this.mysql.getUsers();
  }

  openDB(name: string = '--new--') {
    this.ngZone.run(() => {
      this.router.navigate(['db', name], { relativeTo: this.activatedRoute });
    });
  }

  openUser(user: string = '--new--') {
    this.ngZone.run(() => {
      this.router.navigate(['usr', user], { relativeTo: this.activatedRoute });
    });
  }


}
