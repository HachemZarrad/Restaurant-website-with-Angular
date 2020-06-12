import { Component, OnInit } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Promotion } from '../shared/promotion';
import { MatDialogRef } from '@angular/material';
import { AdministrationService } from '../services/administration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promoform',
  templateUrl: './promoform.component.html',
  styleUrls: ['./promoform.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class PromoformComponent implements OnInit {

  promo = {name: '', image: '', label: '', price: '', featured: false, description: ''};
  errMess: String;
  promoAdded = false;
  promotions: Promotion[];

  
  constructor(public dialogRef: MatDialogRef<PromoformComponent>,
    private administrationService: AdministrationService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.promo.image = '/images/' + res.filename ;
    console.log(this.promo.image);},
      errmess => this.errMess = <any>errmess);
  }



  addPromo() {
    console.log('promo: ', this.promo);
    this.administrationService.postPromo(this.promo)
      .subscribe(res => {
          this.promoAdded = true;
          this.administrationService.getPromotions()
         .subscribe(promotions => this.promotions = promotions,
          errmess => this.errMess = <any>errmess);
        },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }

  refresh(): void {
    window.location.reload();
}

}
