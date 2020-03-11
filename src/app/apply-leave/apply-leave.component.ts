import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  applyLeaveForm: FormGroup;
  typeOfLeaves = ['Sick', 'Vacation', 'Maternity'];
  applyLeaveFormSubmitted: boolean = false;
  @ViewChild('alForm', {static: false}) alForm;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.applyLeaveForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'typeOfLeave': new FormControl(null, Validators.required),
      'fromDate': new FormControl(null, Validators.required),
      'toDate': new FormControl(null, Validators.required),
      'numberOfDays': new FormControl({value: null, disabled: false}, Validators.required),
      'reason': new FormControl(null, Validators.required)
    })
  }

  calculateNoOfDays() {
    const fromDate = this.applyLeaveForm.get('fromDate').value;
    const toDate = this.applyLeaveForm.get('toDate').value;

    if(fromDate === null || toDate === null) {
      this.dialog.open(DialogComponent, {data: {title: 'Invalid Input', content: 'Kindly input From Date, or To Date before calculating.', button_position: '165px', component: 'apply_leave'}});
    }
    else {
      const firstDate = moment(this.applyLeaveForm.get('fromDate').value);
      const secondDate = moment(this.applyLeaveForm.get('toDate').value);
      const diffInDays = Math.abs(firstDate.diff(secondDate, 'days')) + 1; 
      this.applyLeaveForm.patchValue({
        'numberOfDays': diffInDays
      })      
    }
  }

  onSubmit() {
    this.applyLeaveFormSubmitted = true;
    if( this.applyLeaveForm.invalid === false) {
      // Valid Form
      // Create JSONObj
      // Save JSONObj to sessionStorage
      // reset applyLeaveForm
      let JSONObj;
      const firstName = this.applyLeaveForm.get('firstName').value;
      const lastName = this.applyLeaveForm.get('lastName').value;
      const typeOfLeave = this.applyLeaveForm.get('typeOfLeave').value;
      const fromDate = this.applyLeaveForm.get('fromDate').value;
      const toDate = this.applyLeaveForm.get('toDate').value;
      const numberOfDays = this.applyLeaveForm.get('numberOfDays').value;
      const reason = this.applyLeaveForm.get('reason').value;

      const name = (firstName.replace(/ /g,"_") + '_' + lastName.replace(/ /g,"_")).toLowerCase();

      if (window.sessionStorage.getItem('leaves') === null) {
        // leaves is not yet existing
        JSONObj = {
          "leaves": [
            {
              "first_name": firstName,
              "last_name": lastName,
              "type_of_leave": typeOfLeave,
              "from_date": fromDate,
              "to_date": toDate,
              "number_of_days": numberOfDays,
              "reason": reason
            }
          ]
        }
        console.log(JSONObj);
        window.sessionStorage.setItem('leaves', JSON.stringify(JSONObj));
      }
      else {
        JSONObj = {
          "leaves": [
            ...JSON.parse(window.sessionStorage.getItem('leaves')).leaves,
            {
              "first_name": firstName,
              "last_name": lastName,
              "type_of_leave": typeOfLeave,
              "from_date": fromDate,
              "to_date": toDate,
              "number_of_days": numberOfDays,
              "reason": reason
            }
          ]
        }
        console.log(JSONObj);
        window.sessionStorage.setItem('leaves', JSON.stringify(JSONObj))
      }
      this.applyLeaveForm.reset();
      this.alForm.resetForm();
      // this.applyLeaveFormSubmitted = true;
      // this.applyLeaveForm.markAsPristine();
      // this.applyLeaveForm.markAsUntouched();
    }
    else {
      this.dialog.open(DialogComponent, {data: {title: 'Invalid Input', content: 'Kindly correct all invalid input/s before submitting.', button_position: '165px', component: 'apply_leave'}});

    }
  }
}