import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdministrationService } from '../services/administration.service';
import { switchMap } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {

  feedIds: string[];
  feedback: Feedback;
  errMess: string;
  feedbacks: Feedback[];


  constructor( private administrationService: AdministrationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.administrationService.getFeedbackIds().subscribe(feedIds => this.feedIds = feedIds);
    this.route.params.pipe(switchMap((params: Params) => { return this.administrationService.getFeedback(params['id']); }))
    .subscribe(feedback => {
      this.feedback = feedback;
  },
  errmess => this.errMess = <any>errmess);
}

deleteFeedback(id: string) {
  console.log('Deleting Feedback ' + id);
  this.administrationService.deleteFeedback(id)
    .subscribe(feedbacks => {this.feedbacks = <Feedback[]>feedbacks;
     this.router.navigate(['/feedbacks']);},
      errmess => this.errMess = <any>errmess);
 }

 goBack(): void {
  this.location.back();
}

}
