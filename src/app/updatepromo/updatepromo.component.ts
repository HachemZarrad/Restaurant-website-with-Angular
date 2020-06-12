import { Component, OnInit, Inject } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Promotion } from '../shared/promotion';
import { ActivatedRoute, Params } from '@angular/router';
import { AdministrationService } from '../services/administration.service';
import { PromotionService } from '../services/promotion.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-updatepromo',
  templateUrl: './updatepromo.component.html',
  styleUrls: ['./updatepromo.component.scss'],

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
export class UpdatepromoComponent implements OnInit {

  promo: Promotion;
  promotionsIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
   

  constructor(private route: ActivatedRoute,
    private administrationService: AdministrationService,
    private promoService: PromotionService,
    private location: Location,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    

    this.promoService.getPromotionsIds().subscribe(promotionsIds => this.promotionsIds = promotionsIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.promoService.getPromotion(params['id']); }))
    .subscribe(promo => {
      this.promo = promo;
      this.setPrevNext(promo._id);
      this.visibility = 'shown';
    },
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(promoId: string) {
    const index = this.promotionsIds.indexOf(promoId);
    this.prev = this.promotionsIds[(this.promotionsIds.length + index - 1) % this.promotionsIds.length];
    this.next = this.promotionsIds[(this.promotionsIds.length + index + 1) % this.promotionsIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.promo.image = '/images/' + res.filename ;
    console.log(this.promo.image);},
      errmess => this.errMess = <any>errmess);
  }

  updatePromo(promo){
      this.administrationService.putPromotion(promo).subscribe(
      promo => {this.promo = promo;},
      errmess => {this.errMess = <any>errmess;});
  }

}
