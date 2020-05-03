import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess : String;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, 
    private leaderService: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((featuredDish) => this.dish = featuredDish, errmess  => this.dishErrMess  = <any>errmess );

    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion);
    
     this.leaderService.getFeaturedLeader()
    .subscribe((featuredLeader) => this.leader = featuredLeader);
  }

}
