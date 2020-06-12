import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { User } from '../shared/user';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserDeleteAlertComponent } from '../user-delete-alert/user-delete-alert.component';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class ListOfUsersComponent implements OnInit {

  users: User[];
  listOfUsers : User[] = [];
  errMess: String;
  delete: Boolean;

  constructor(private administrationService: AdministrationService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
       this.administrationService.getUsers()
       .subscribe(users => this.users = users,
        errmess => this.errMess = <any>errmess);
  }

  alert(id: string) {
    this.administrationService.gatherId(id);
    const userDeleteAlert = this.dialog.open(UserDeleteAlertComponent, {width: '500px', height: '450px'});
      userDeleteAlert.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  searchResult(input) {
    let name = input.value.trim();
    console.log(name);
    this.administrationService.getUserByName(name).subscribe(
      (response) => {
        console.log(response);
        this.listOfUsers = response;
      },
      (error) => {
        console.log("Error with !");     
      }
    )

  }

  onSelectUser(user: User) {
    this.listOfUsers = [];
    this.router.navigate(['/userdetail', user._id]);

  }

  emptyList(){
    this.listOfUsers = [];
  }


}
