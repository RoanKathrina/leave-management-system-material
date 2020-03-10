import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-management-system',
  templateUrl: './leave-management-system.component.html',
  styleUrls: ['./leave-management-system.component.css']
})
export class LeaveManagementSystemComponent implements OnInit {
  badgeCount = 8;
  viewMode: string;
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  setViewMode(viewMode: string) {
    this.viewMode = viewMode;
  }

  onLogOut() {
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

}