import { Component, OnInit, Input } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;
  administrator: Boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private administrationService: AdministrationService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.admin);
        } else {
          console.log(res);
        }

      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }

}
