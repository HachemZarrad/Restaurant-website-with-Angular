import { Component, OnInit, Inject } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
import { MatDialog } from '@angular/material';
import { LeaderformComponent } from '../leaderform/leaderform.component';

@Component({
  selector: 'app-leaders-management',
  templateUrl: './leaders-management.component.html',
  styleUrls: ['./leaders-management.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class LeadersManagementComponent implements OnInit {

  delete: Boolean;
  leaders: Leader[];
  errMess: String;

  constructor(private administrationService: AdministrationService,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) {
     }

  ngOnInit() {
    this.administrationService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

  deleteLeader(id: string) {
    console.log('Deleting Leader ' + id);
    this.administrationService.deleteLeader(id)
    .subscribe(res => {
      this.reloadPage();
    },
        errmess => this.errMess = <any>errmess);
    this.delete = false;
      }

      openLeaderForm() {
        const leaderForm = this.dialog.open(LeaderformComponent, {width: '500px', height: '680px'});
        leaderForm.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
      }

      reloadPage() {
        this.administrationService.getLeaders()
      .subscribe(leaders => this.leaders = leaders ,
       errmess => this.errMess = <any>errmess);
      }


}
