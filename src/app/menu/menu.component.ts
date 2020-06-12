import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {

  dishes: Dish[];
  listOfDishes: Dish[] = [];
  errMess: string;
  input: string;


  constructor(private dishService: DishService,
    private router: Router,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

 
  searchResult(input) {
    let name = input.value.trim();
    console.log(name);
    this.dishService.getDishByName(name).subscribe(
      (response) => {
        console.log(response);
        this.listOfDishes = response;
      },
      (error) => {
        console.log("Error with !");     
      }
    )

  }

  onSelectDish(dish: Dish) {
    this.listOfDishes = [];
    this.router.navigate(['/dishdetail', dish._id]);

  }

  emptyList(){
    this.listOfDishes = [];
  }

}
