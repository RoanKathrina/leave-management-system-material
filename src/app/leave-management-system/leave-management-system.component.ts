import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-management-system',
  templateUrl: './leave-management-system.component.html',
  styleUrls: ['./leave-management-system.component.css']
})
export class LeaveManagementSystemComponent implements OnInit {
  badgeCount = 8; 
  viewMode: string;
  adminIsLoggedInSubject: Subscription;
  adminIsLoggedIn;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AppService) { }

  ngOnInit() {
    this.adminIsLoggedInSubject = this.service.adminIsLoggedIn.subscribe(adminIsLoggedIn => this.adminIsLoggedIn = adminIsLoggedIn);
  }

  setViewMode(viewMode: string) {
    this.viewMode = viewMode;
  }

  onLogOut() {
    this.service.adminIsLoggedIn.next(false);
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

}