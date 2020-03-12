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
    const JSONObj = {"approved": [], "rejected": []};

    if (this.user === null) {
      return;
    }
    else {
      console.log('User', this.user);
      console.log('Value of User', JSON.parse(window.sessionStorage.getItem(this.user)));
      if(window.sessionStorage.getItem(this.user) === null) {
        window.sessionStorage.setItem(this.user, JSON.stringify(JSONObj));
        this.dataSource = [
          ...JSON.parse(window.sessionStorage.getItem(this.user)).approved, 
          ...JSON.parse(window.sessionStorage.getItem(this.user)).rejected,];
      }
      else {
        let tempList = [];
        let JSONObj;
        const approved = JSON.parse(window.sessionStorage.getItem(this.user)).approved;
        console.log(JSON.parse(window.sessionStorage.getItem(this.user)));
        approved.forEach(item => {
          JSONObj = {
            "first_name": item.first_name,
            "last_name": item.last_name,
            "type_of_leave": item.type_of_leave,
            "from_date": item.from_date,
            "to_date": item.to_date,
            "number_of_days": item.number_of_days,
            "reason": item.reason,
            "status": "Approved"
          }
          tempList.push(JSONObj);
        })

        const rejected = JSON.parse(window.sessionStorage.getItem(this.user)).rejected;
        rejected.forEach(item => {
          JSONObj = {
            "first_name": item.first_name,
            "last_name": item.last_name,
            "type_of_leave": item.type_of_leave,
            "from_date": item.from_date,
            "to_date": item.to_date,
            "number_of_days": item.number_of_days,
            "reason": item.reason,
            "status": "Rejected"
          }
          tempList.push(JSONObj);
        })
        this.dataSource = tempList;
        // this.dataSource = [
        //   ...JSON.parse(window.sessionStorage.getItem(this.user)).approved,
        //   ...JSON.parse(window.sessionStorage.getItem(this.user)).rejected
        // ]
      }
    }


  }

}