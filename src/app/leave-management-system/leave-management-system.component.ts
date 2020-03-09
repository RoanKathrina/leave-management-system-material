import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-management-system',
  templateUrl: './leave-management-system.component.html',
  styleUrls: ['./leave-management-system.component.css']
})
export class LeaveManagementSystemComponent implements OnInit {
  badgeCount = 8;
  viewMode: string;
  constructor() { }

  ngOnInit() {
  }

  setViewMode(viewMode: string) {
    this.viewMode = viewMode;
  }

}