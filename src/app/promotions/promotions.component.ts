import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { AdministrationService } from '../services/administration.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class PromotionsComponent implements OnInit {

  
  delete: Boolean;
  errMess: String;
  promotions: Promotion[];

  constructor(private administrationService: AdministrationService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.administrationService.getPromotions()
      .subscribe(promotions => this.promotions = promotions,
        errmess => this.errMess = <any>errmess);
  }

}
