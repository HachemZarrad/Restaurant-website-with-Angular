import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdministrationService } from '../services/administration.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';
import { UserDeleteAlertComponent } from '../user-delete-alert/user-delete-alert.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  errMess: string;
  usersIds: string[];
  user: User;

  constructor(private administrationService: AdministrationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.administrationService.getUsersIds().subscribe(usersIds => this.usersIds = usersIds);
    this.route.params.pipe(switchMap((params: Params) => { return this.administrationService.getUser(params['id']); }))
    .subscribe(user => {
      this.user = user;
  },
  errmess => this.errMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }

  alert(id: string) {
    this.administrationService.gatherId(id);
    const userDeleteAlert = this.dialog.open(UserDeleteAlertComponent, {width: '500px', height: '450px'});
      userDeleteAlert.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
      this.router.navigate(['/usersList']);
  }

}
