import { Component, OnInit, Inject } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { ActivatedRoute, Params } from '@angular/router';
import { AdministrationService } from '../services/administration.service';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.scss'],

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
export class UpdateDishComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
   

  constructor(private route: ActivatedRoute,
    private administrationService: AdministrationService,
    private dishService: DishService,
    private location: Location,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish._id);
      this.visibility = 'shown';
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

  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.dish.image = '/images/' + res.filename ;
    console.log(this.dish.image);},
      errmess => this.errMess = <any>errmess);
  }

  updateDish(dish){
      this.administrationService.putDish(dish).subscribe(
      dish => {this.dish = dish;},
      errmess => {this.errMess = <any>errmess;});
  }

}
