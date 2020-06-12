import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdministrationService } from '../services/administration.service';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  errMess: string;
  feedbacks: Feedback;
  delete: Boolean;

  constructor(public dialogRef: MatDialogRef<AlertsComponent>,
    private administrationService: AdministrationService) { }

  ngOnInit() {
  }

  removeFeedbacks() {
    this.administrationService.deleteFeedbacks()
      .subscribe(feedbacks => { this.feedbacks = <Feedback>feedbacks;
       this.delete = true; },
        errmess => {
        this.errMess = <any>errmess
      });
  }
  

}
