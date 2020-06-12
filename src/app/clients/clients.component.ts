import { Component, OnInit } from '@angular/core';
import { AlertsComponent } from '../alerts/alerts.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openFeedbacksAlert() {
    const alertRef = this.dialog.open(AlertsComponent, {width: '500px', height: '450px'});
    alertRef.afterClosed()
      .subscribe(result => {
        console.log(result);
  
      });
  }


}
