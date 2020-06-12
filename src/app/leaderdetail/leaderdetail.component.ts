import { Component, OnInit, Inject } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Leader } from '../shared/leader';
import { ActivatedRoute, Params } from '@angular/router';
import { LeaderService } from '../services/leader.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-leaderdetail',
  templateUrl: './leaderdetail.component.html',
  styleUrls: ['./leaderdetail.component.scss'],

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
export class LeaderdetailComponent implements OnInit {

  leader: Leader;
  leaderIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
   

  constructor(private route: ActivatedRoute,
    private administrationService: AdministrationService,
    private leaderService: LeaderService,
    private location: Location,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    

    this.leaderService.getLeaderIds().subscribe(leaderIds => this.leaderIds = leaderIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.leaderService.getLeader(params['id']); }))
    .subscribe(leader => {
      this.leader = leader;
      this.setPrevNext(leader._id);
      this.visibility = 'shown';
    },
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(leaderId: string) {
    const index = this.leaderIds.indexOf(leaderId);
    this.prev = this.leaderIds[(this.leaderIds.length + index - 1) % this.leaderIds.length];
    this.next = this.leaderIds[(this.leaderIds.length + index + 1) % this.leaderIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.leader.image = '/images/' + res.filename ;
    console.log(this.leader.image);},
      errmess => this.errMess = <any>errmess);
  }

  updateLeader(leader){
      this.administrationService.putLeader(leader).subscribe(
      leader => {this.leader = leader;},
      errmess => {this.errMess = <any>errmess;});
  }


}
