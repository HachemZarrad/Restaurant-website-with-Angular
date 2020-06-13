import { Component, OnInit } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { MatDialogRef } from '@angular/material';
import { AdministrationService } from '../services/administration.service';
import { HttpClient } from '@angular/common/http';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishform',
  templateUrl: './dishform.component.html',
  styleUrls: ['./dishform.component.scss'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class DishformComponent implements OnInit {

  dish = {name: '', image: '', category: '', label: '', price: '', featured: false, description: ''};
  errMess: String;
  dishAdded = false;
  dishes: Dish[];
  
 
  constructor(public dialogRef: MatDialogRef<DishformComponent>,
    private administrationService: AdministrationService,
    private dishService: DishService,
    private http: HttpClient) { }

  ngOnInit() {
  }


  upload(event){
    this.administrationService.uploadImage(event)
    .subscribe(res => {this.dish.image = '/images/' + res.filename ;
    console.log(this.dish.image);},
      errmess => this.errMess = <any>errmess);
      
  }

  addDish(dish) {
    console.log('dish: ', this.dish);
    this.administrationService.postDish(dish)
      .subscribe(res => {
          this.dishAdded = true;
          this.errMess = "";
          this.dishService.getDishes()
         .subscribe(dishes => this.dishes = dishes,
          errmess => this.errMess = <any>errmess);
        },
      error => {
        console.log(error);
        if(this.dish.image == ""){
          this.errMess = "Dish image is required!";
        }
        else if(error == "500 - Internal Server Error Http failure response for http://localhost:3000/dishes/: 500 Internal Server Error"){
          this.errMess = "Dish name already exists!!";
        }
        else{
          this.errMess = error;
        }
        
      });
  }

  refresh(): void {
    window.location.reload();
}
  
}


