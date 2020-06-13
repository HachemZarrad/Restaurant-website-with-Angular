import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { AdministrationService } from '../services/administration.service';
import { MatDialog } from '@angular/material';
import { DishService } from '../services/dish.service';
import { DishformComponent } from '../dishform/dishform.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes-management',
  templateUrl: './dishes-management.component.html',
  styleUrls: ['./dishes-management.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class DishesManagementComponent implements OnInit {

  delete: Boolean;
  dishes: Dish[];
  errMess: String;
  listOfDishes: Dish[] = [];
  input: string;

  constructor(private administrationService: AdministrationService,
    private dishService: DishService,
    private router: Router,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) {
     }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  deleteDish(id: string) {
    console.log('Deleting Dish ' + id);
    this.administrationService.deleteDish(id)
    .subscribe(res => {
      this.reloadPage();
    },
        errmess => this.errMess = <any>errmess);
    this.delete = false;
      }

      openDishForm() {
        const dishForm = this.dialog.open(DishformComponent, {width: '500px', height: '680px'});
        dishForm.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
      }

      reloadPage() {
        this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes ,
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
        this.router.navigate(['/updateDish', dish._id]);
    
      }
    
      emptyList(){
        this.listOfDishes = [];
      }
}
