import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTable } from '@angular/material';

import leaves from '../json/fs_bench_leave_applications.json';

@Component({
  selector: 'app-leave-applications',
  templateUrl: './leave-applications.component.html',
  styleUrls: ['./leave-applications.component.css']
})
export class LeaveApplicationsComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'type_of_leave', 'from_date', 'to_date', 'number_of_days', 'reason', 'approve', 'reject'];
  dataSource;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private dialog: MatDialog,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSource = leaves.leaves;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  approveLeave(element, position: number) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: 'Confirmation Message', content: `Are you sure you want to allow member: ${element.first_name} ${element.last_name} to have ${element.type_of_leave} leave?`, button_position: '150px', component: 'leave_applications'}});

    dialogRef.afterClosed().subscribe(result => 
      {
        if(result === 'no') {
          return;
        }
        else {
          const name = (element.first_name.replace(/ /g,"_") + '_' + element.last_name.replace(/ /g,"_")).toLowerCase();
          console.log(name);
          let JSONObj;
          if(window.sessionStorage.getItem(name) !== null) {
            // roan_kathrina_dimaculangan is existing
            JSONObj = {
              "approved": [
                ...JSON.parse(window.sessionStorage.getItem(name)).approved,
                {
                  "first_name": element.first_name,
                  "last_name": element.last_name,
                  "type_of_leave": element.type_of_leave,
                  "from_date": element.from_date,
                  "to_date": element.to_date,
                  "number_of_days": element.number_of_days,
                  "reason": element.reason                  
                }
              ],
              "rejected": [
                ...JSON.parse(window.sessionStorage.getItem(name)).rejected
              ]
            }
            window.sessionStorage.setItem(name, JSON.stringify(JSONObj));
          } else {
            JSONObj = {
              "approved": [
                {
                  "first_name": element.first_name,
                  "last_name": element.last_name,
                  "type_of_leave": element.type_of_leave,
                  "from_date": element.from_date,
                  "to_date": element.to_date,
                  "number_of_days": element.number_of_days,
                  "reason": element.reason                  
                }
              ],
              "rejected": [
              ]
            }
            window.sessionStorage.setItem(name, JSON.stringify(JSONObj));
          }
          this.dataSource.splice(position, 1);
          this.table.renderRows();
          // this.cdr.detectChanges();
          // Create a JSONObj
          // Save the JSONObj in the sessionStorage
          // Delete the element in list
        }
      }
    )

  }
}