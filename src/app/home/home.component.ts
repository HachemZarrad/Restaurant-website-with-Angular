import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
   host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess : String;
  promoErrMess: String;
  leaderErrMess: String;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, 
    private leaderService: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((featuredDish) => this.dish = featuredDish, errmess  => this.dishErrMess  = <any>errmess );

    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion, errmsg => this.promoErrMess = <any>errmsg );
    
     this.leaderService.getFeaturedLeader()
    .subscribe((featuredLeader) => this.leader = featuredLeader, errmsg => this.leaderErrMess = <any>errmsg);
  }

}
