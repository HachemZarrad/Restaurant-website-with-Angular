import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Promotion } from '../shared/promotion';
import { AdministrationService } from '../services/administration.service';
import { DishService } from '../services/dish.service';
import { MatDialog } from '@angular/material';
import { PromotionService } from '../services/promotion.service';
import { PromoformComponent } from '../promoform/promoform.component';

@Component({
  selector: 'app-promos-management',
  templateUrl: './promos-management.component.html',
  styleUrls: ['./promos-management.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class PromosManagementComponent implements OnInit {

  delete: Boolean;
  promotions: Promotion[];
  errMess: String;

  constructor(private administrationService: AdministrationService,
    private promoService: PromotionService,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) {
     }

  ngOnInit() {
    this.promoService.getPromotions()
      .subscribe(promotions => this.promotions = promotions,
        errmess => this.errMess = <any>errmess);
  }

  deletePromo(id: string) {
    console.log('Deleting Promotions ' + id);
    this.administrationService.deletePromo(id)
    .subscribe(res => {
      this.reloadPage();
    },
        errmess => this.errMess = <any>errmess);
    this.delete = false;
      }

      openPromoForm() {
        const promoForm = this.dialog.open(PromoformComponent, {width: '500px', height: '680px'});
        promoForm.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
      }

      reloadPage() {
        this.promoService.getPromotions()
      .subscribe(promotions => this.promotions = promotions ,
       errmess => this.errMess = <any>errmess);
      }


}
