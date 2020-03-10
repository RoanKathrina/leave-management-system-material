import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;
  constructor() { }

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
      
    } else {
      return;
    }
  }
}