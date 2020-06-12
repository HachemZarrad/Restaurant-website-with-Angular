import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { MatDialogRef } from '@angular/material';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-user-delete-alert',
  templateUrl: './user-delete-alert.component.html',
  styleUrls: ['./user-delete-alert.component.scss']
})
export class UserDeleteAlertComponent implements OnInit {

  errMess: string;
  client: User;
  delete: Boolean;
  

  constructor(public dialogRef: MatDialogRef<UserDeleteAlertComponent>,
    private administrationService: AdministrationService) { }

  ngOnInit() {
  }

  removeClient() {
    this.administrationService.deleteUser(this.administrationService.userId)
      .subscribe(client => { this.client = <User>client;
       this.delete = true; },
        errmess => {
        this.errMess = <any>errmess
      });
       
    }

    refresh(): void {
      window.location.reload();
  }

}
