import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MysqlService } from 'src/app/services/mysql.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  hide = true;

  userForm: FormGroup = this.fb.group({
    name: null,
    columns: this.fb.array([]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private mysql: MysqlService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['main']);
  }

  saveUser(){
    console.log("user created");
  }



}
