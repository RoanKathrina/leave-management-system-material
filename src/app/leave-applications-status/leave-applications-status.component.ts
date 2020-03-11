import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-leave-applications-status',
  templateUrl: './leave-applications-status.component.html',
  styleUrls: ['./leave-applications-status.component.css']
})
export class LeaveApplicationsStatusComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'type_of_leave', 'from_date', 'to_date', 'number_of_days', 'reason', 'status'];
  dataSource; 
  userSubject: Subscription;
  user: string;
  constructor(private service: AppService) { }

  ngOnInit() {
    this.userSubject = this.service.user.subscribe(userLoggedIn => this.user = userLoggedIn);
    const JSONObj = [];
    if(window.sessionStorage.getItem(this.user) === null) {
      window.sessionStorage.setItem(this.user, JSON.stringify(JSONObj));
      this.dataSource = JSON.parse(window.sessionStorage.getItem(this.user));
    }
    else {
      const approved = JSON.parse(window.sessionStorage.getItem(this.user)).approved
      // this.dataSource = [
      //   ...JSON.parse(window.sessionStorage.getItem(this.user)).approved,
      //   ...JSON.parse(window.sessionStorage.getItem(this.user)).rejected
      // ]
    }
  }

}