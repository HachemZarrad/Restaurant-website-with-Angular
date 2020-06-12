import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { PromotionsComponent } from '../promotions/promotions.component';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-promodetail',
  templateUrl: './promodetail.component.html',
  styleUrls: ['./promodetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
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
export class PromoDetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;
  promo: Promotion;
  promoIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite = false;

  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private promotionService: PromotionService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.createForm();

    

    this.promotionService.getPromotionsIds().subscribe(promoIds => this.promoIds = promoIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.promotionService.getPromotion(params['id']); }))
    .subscribe(promo => {
      this.promo = promo;
      this.setPrevNext(promo._id);
      this.visibility = 'shown';
      this.favoriteService.isFavorite(this.promo._id)
      .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);

    this.promotionService.getPromotion(this.promo._id) 
    .subscribe(promo => this.promo = <Promotion>promo);
  }

  setPrevNext(promoId: string) {
    const index = this.promoIds.indexOf(promoId);
    this.prev = this.promoIds[(this.promoIds.length + index - 1) % this.promoIds.length];
    this.next = this.promoIds[(this.promoIds.length + index + 1) % this.promoIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required],
      date:this.getIsoDate()
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.promotionService.postComment(this.promo._id, this.commentForm.value)
      .subscribe(promo => this.promo = <Promotion>promo);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: '',
      date: ''
    });
  
    this.refresh();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  addToFavorites() {
    if (!this.favorite) {
      this.favoriteService.postFavorite(this.promo._id)
        .subscribe(favorites => { console.log(favorites); this.favorite = true; });
    }
  }

  getIsoDate(): String {
    var currentDate = new Date();
    var ISODATE = currentDate.toISOString();
    return ISODATE;
  }

  refresh(): void {
    window.location.reload();
  }


}
