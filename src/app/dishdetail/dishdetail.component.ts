import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { MatDialog} from '@angular/material';
import { AdministrationService } from '../services/administration.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
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
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;
  dish: Dish;
  dishIds: string[];
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

  constructor(private dishservice: DishService,
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
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish._id);
      this.visibility = 'shown';
      this.favoriteService.isFavorite(this.dish._id)
      .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
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
    this.dishservice.postComment(this.dish._id, this.commentForm.value)
      .subscribe(dish => { this.dish = <Dish>dish; 
        this.dishservice.getDish(this.dish._id) 
        .subscribe(dish => this.dish = <Dish>dish);});
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

  addToFavorites() {
    if (!this.favorite) {
      this.favoriteService.postFavorite(this.dish._id)
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

  deleteComment(dishId: string ,commentId: string){
    this.administrationService.deleteDishComment(dishId,commentId)
    .subscribe(res => { console.log(res);
      this.dishservice.getDish(this.dish._id) 
      .subscribe(dish => this.dish = <Dish>dish);
    },
   errmess => this.errMess = <any>errmess);

   this.dishservice.getDish(this.dish._id) 
    .subscribe(dish => this.dish = <Dish>dish);
   
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

  
}






