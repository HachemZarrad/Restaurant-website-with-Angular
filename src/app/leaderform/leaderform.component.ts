import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdministrationService } from '../services/administration.service';
import { flyInOut, expand } from '../animations/app.animation';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-leaderform',
  templateUrl: './leaderform.component.html',
  styleUrls: ['./leaderform.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class LeaderformComponent implements OnInit {

  leader = {name: '', image: '', designation: '', abbr: '', featured: false, description: ''};
  errMess: String;
  leaderAdded = false;
  leaders: Leader[];
  buttonClicked = false;
  
  constructor(public dialogRef: MatDialogRef<LeaderformComponent>,
    private administrationService: AdministrationService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  

  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.leader.image = '/images/' + res.filename ;
    console.log(this.leader.image);},
      errmess => this.errMess = <any>errmess);
  }



  onSubmit() {
    console.log('leader: ', this.leader);
    this.administrationService.postLeader(this.leader)
      .subscribe(res => {
          this.leaderAdded = true;
          this.administrationService.getLeaders()
         .subscribe(leaders => this.leaders = leaders,
          errmess => this.errMess = <any>errmess);
        },
      error => {
        console.log(error);
        this.errMess = error;
      });
      this.buttonClicked = true;
  }

  refresh(): void {
    window.location.reload();
}
  
}
