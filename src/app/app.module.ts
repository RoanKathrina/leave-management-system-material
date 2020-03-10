import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveApplicationsStatusComponent } from './leave-applications-status/leave-applications-status.component';
import { LoginComponent } from './login/login.component';
import { LeaveManagementSystemComponent } from './leave-management-system/leave-management-system.component';
import { DialogComponent } from './dialog/dialog.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  MaterialModule,
                  BrowserAnimationsModule,
                  AppRoutingModule,
                  ReactiveFormsModule],
  declarations: [ AppComponent,
                  LeaveApplicationsComponent,
                  ApplyLeaveComponent,
                  LeaveApplicationsStatusComponent,
                  LoginComponent,
                  LeaveManagementSystemComponent,
                  DialogComponent],
  entryComponents: [
                  DialogComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [
    AppService
  ]
})
export class AppModule { }
