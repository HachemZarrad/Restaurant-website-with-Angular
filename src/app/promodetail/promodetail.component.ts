import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { FavoriteService } from '../services/favorite.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../services/administration.service';
import { AuthService } from '../services/auth.service';


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
  promotionIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
  favorite = false;
  edit = false;
  display = false;
  authorized = false;
  userId: string = undefined;
  subscription: Subscription;

  

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
    private administrationService: AdministrationService,
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public dialog: MatDialog,
  
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
      this.subscription = this.authService.getUserId()
      .subscribe(userId => { console.log(userId); this.userId = userId; 
         });
    this.createForm();
    this.promotionService.getPromotionsIds().subscribe(promotionIds => this.promotionIds = promotionIds);
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

  }

  setPrevNext(promotionId: string) {
    const index = this.promotionIds.indexOf(promotionId);
    this.prev = this.promotionIds[(this.promotionIds.length + index - 1) % this.promotionIds.length];
    this.next = this.promotionIds[(this.promotionIds.length + index + 1) % this.promotionIds.length];
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
      .subscribe(promo => { this.promo = <Promotion>promo; 
        this.promotionService.getPromotion(this.promo._id) 
        .subscribe(promo => this.promo = <Promotion>promo);});
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: '',
      date: ''
    });
    
    //this.refresh();
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


  getIsoDate(): String {
    var currentDate = new Date();
    var ISODATE = currentDate.toISOString();
    return ISODATE;
  }

  refresh(): void {
    window.location.reload();
  }

  deleteComment(promoId: string ,commentId: string){
    this.administrationService.deletePromoComment(promoId,commentId)
    .subscribe(res => { console.log(res);
      this.promotionService.getPromotion(this.promo._id) 
      .subscribe(promo => this.promo = <Promotion>promo);
    },
   errmess => this.errMess = <any>errmess);

   this.promotionService.getPromotion(this.promo._id) 
    .subscribe(promo => this.promo = <Promotion>promo);
   
  }

  displayMenu(authorId: string){
    console.log(this.userId);
    if(authorId == this.userId){
        this.authorized = true;
    }
    else{
      this.authorized = false;
    }
  }

  allowEdit(authorId: string, author: Boolean) {
      this.edit = true;
      console.log("1", author);
      if(authorId != this.userId){
        author = false;
        console.log("2", author);
      }
      
      console.log("3", author);

  }

  cancelEdit(){
    this.edit = false;
  }

  UpdateComment(dishId: string ,commentId: string, newComment){
    this.edit = false;
    this.administrationService.putDishComment(dishId, commentId, newComment)
    .subscribe(res => {
      console.log(res);
    },
    errmess => this.errMess = <any>errmess);
  }

  openLoginForm(){
    if(!this.userId){
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'})
      loginRef.afterClosed()
        .subscribe(result => {
          if(result){
            console.log(result);
          }  
        });
      }
  }

//   @ViewChild('cform') commentFormDirective;
//   promo: Promotion;
//   promoIds: string[];
//   prev: string;
//   next: string;
//   errMess: string;
//   visibility = 'shown';
//   favorite = false;
//   edit = false;
//   display = false;
//   authorized = false;
//   userId: string = undefined;
//   subscription: Subscription;

//   formErrors = {
//     'comment': ''
//   };

//   validationMessages = {
//     'comment': {
//       'required':      'Comment is required.'
//     }
//   };

//   commentForm: FormGroup;

//   constructor(private promotionService: PromotionService,
//     private favoriteService: FavoriteService,
//     private route: ActivatedRoute,
//     private administrationService: AdministrationService,
//     private location: Location,
//     private authService: AuthService,
//     private fb: FormBuilder,
//     public dialog: MatDialog,
//     @Inject('baseURL') private baseURL) { }

//   ngOnInit() {
//     this.authService.loadUserCredentials();
//       this.subscription = this.authService.getUserId()
//       .subscribe(userId => { console.log(userId); this.userId = userId; 
//          });
//     this.createForm();
//     this.promotionService.getPromotionsIds().subscribe(promoIds => this.promoIds = promoIds);
//     this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.promotionService.getPromotion(params['id']); }))
//     .subscribe(promo => {
//       this.promo = promo;
//       this.setPrevNext(promo._id);
//       this.visibility = 'shown';
//       this.favoriteService.isFavorite(this.promo._id)
//       .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
//           err => console.log(err));
//     },
//     errmess => this.errMess = <any>errmess);

//   }

//   setPrevNext(promoId: string) {
//     const index = this.promoIds.indexOf(promoId);
//     this.prev = this.promoIds[(this.promoIds.length + index - 1) % this.promoIds.length];
//     this.next = this.promoIds[(this.promoIds.length + index + 1) % this.promoIds.length];
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   createForm() {
//     this.commentForm = this.fb.group({
//       rating: 5,
//       comment: ['', Validators.required],
//       date:this.getIsoDate()
//     });

//     this.commentForm.valueChanges
//       .subscribe(data => this.onValueChanged(data));

//     this.onValueChanged(); // (re)set validation messages now
//   }

//   onSubmit() {
//     this.promotionService.postComment(this.promo._id, this.commentForm.value)
//       .subscribe(promo => {this.promo = <Promotion>promo
//         this.promotionService.getPromotion(this.promo._id) 
//         .subscribe(promo => this.promo = <Promotion>promo);});
//     this.commentFormDirective.resetForm();
//     this.commentForm.reset({
//       rating: 5,
//       comment: '',
//       date: ''
//     });
  
//   }

//   onValueChanged(data?: any) {
//     if (!this.commentForm) { return; }
//     const form = this.commentForm;
//     for (const field in this.formErrors) {
//       if (this.formErrors.hasOwnProperty(field)) {
//         // clear previous error message (if any)
//         this.formErrors[field] = '';
//         const control = form.get(field);
//         if (control && control.dirty && !control.valid) {
//           const messages = this.validationMessages[field];
//           for (const key in control.errors) {
//             if (control.errors.hasOwnProperty(key)) {
//               this.formErrors[field] += messages[key] + ' ';
//             }
//           }
//         }
//       }
//     }
//   }

//   addToFavorites() {
//     if (!this.favorite) {
//       this.favoriteService.postFavorite(this.promo._id)
//         .subscribe(favorites => { console.log(favorites); this.favorite = true; });
//     }
//   }

//   getIsoDate(): String {
//     var currentDate = new Date();
//     var ISODATE = currentDate.toISOString();
//     return ISODATE;
//   }

//   refresh(): void {
//     window.location.reload();
//   }

//   deleteComment(promoId: string ,commentId: string){
//     this.administrationService.deletePromoComment(promoId,commentId)
//     .subscribe(res => { console.log(res);
//       this.promotionService.getPromotion(this.promo._id) 
//       .subscribe(promo => this.promo = <Promotion>promo);
//     },
//    errmess => this.errMess = <any>errmess);

//    this.promotionService.getPromotion(this.promo._id) 
//     .subscribe(promo => this.promo = <Promotion>promo);
   
//   }

//   displayMenu(authorId: string){
//     console.log(this.userId);
//     if(authorId == this.userId){
//         this.authorized = true;
//     }
//     else{
//       this.authorized = false;
//     }
//   }

//   allowEdit(authorId: string, author: Boolean) {
//     this.edit = true;
//     console.log("1", author);
//     if(authorId != this.userId){
//       author = false;
//       console.log("2", author);
//     }
    
//     console.log("3", author);

// }

// cancelEdit(){
//   this.edit = false;
// }

// UpdateComment(dishId: string ,commentId: string, newComment){
//   this.edit = false;
//   this.administrationService.putDishComment(dishId, commentId, newComment)
//   .subscribe(res => {
//     console.log(res);
//   },
//   errmess => this.errMess = <any>errmess);
// }

//   openLoginForm(){
//     if(!this.userId){
//       const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'})
//       loginRef.afterClosed()
//         .subscribe(result => {
//           if(result){
//             console.log(result);
//           }  
//         });
//       }
//   }


}
