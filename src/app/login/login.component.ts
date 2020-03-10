import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

import fs_bench_members from '../json/fs_bench_members';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;
  members = fs_bench_members;

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private service: AppService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)

    })
  }

  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid === false) {
      // Validate Username, and Password
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      let member = this.members.members.find(item => item.username === username && item.password === password);
      if (member === undefined) {
        this.dialog.open(DialogComponent, {data: {title: 'Invalid input', content: 'The Username, and Password does not exist in the Leave Management System.', button_position: '210px', component: 'login'}})
      }
      else {
        // Check if Username === melody_anne_francisco
        // If no, this.router.navigate(['../leave-management-system'], {relativeTo: this.route})
        // If yes, set the adminIsLoggedIn to true, navigate to this.router.navigate(['../leave_management_system'], {relativeTo: this.route})
        if (username !== 'melody_anne_francisco') {
          this.router.navigate(['../leave-management-system'], {relativeTo: this.route});
        }
        else {
          this.service.adminIsLoggedIn.next(true);
          this.router.navigate(['../leave-management-system'], {relativeTo: this.route});
        }
      }
    } else {
        this.dialog.open(DialogComponent, {data: {title: 'Invalid input', content: 'Kindly input Username, or Password before logging in.', button_position: '150px', component: 'login'}})
    }
  }
}