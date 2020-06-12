import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
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
