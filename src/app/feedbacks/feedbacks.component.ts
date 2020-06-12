import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { Feedback } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { Router } from '@angular/router';
import { FeedbackDetailComponent } from '../feedback-detail/feedback-detail.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FeedbacksComponent implements OnInit {

  feedbacks: Feedback[];
  errMess: String;
  delete: boolean;
  FeedbackList: Feedback[] = [];

  constructor(private administrationService: AdministrationService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.administrationService.getFeedbacks()
    .subscribe(feedbacks => this.feedbacks = feedbacks,
     errmess => this.errMess = <any>errmess);
}

deleteFeedback(id: string) {
 console.log('Deleting Feedback ' + id);
 this.administrationService.deleteFeedback(id)
   .subscribe(feedbacks => {this.feedbacks = <Feedback[]>feedbacks;
    this.reloadPage();},
     errmess => this.errMess = <any>errmess);
 this.delete = false;
}

reloadPage() {
  this.administrationService.getFeedbacks()
    .subscribe(feedbacks => this.feedbacks = feedbacks,
     errmess => this.errMess = <any>errmess);
}

searchResult(input) {
  let name = input.value.trim();
  console.log(name);
  this.administrationService.getFeedByUsername(name).subscribe(
    (response) => {
      console.log(response);
      this.FeedbackList = response;
    },
    (error) => {
      console.log("Error with !");     
    }
  )

}

onSelectFeedback(feedback: Feedback) {
  this.FeedbackList = [];
  this.router.navigate(['/feedbackdetail', feedback._id]);

}

emptyList(){
  this.FeedbackList = [];
  }

    
}
