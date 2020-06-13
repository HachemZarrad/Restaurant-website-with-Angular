import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
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
export class FavoritesComponent implements OnInit {

  favorites: Favorite[] = [];
  delete: boolean;
  errMess: string;
  empty = false;

  constructor(private favoriteService: FavoriteService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => {this.favorites = favorites
      if(!favorites || this.favorites == [] || !this.favorites){
          this.empty = true;
      }},
        errmess => this.errMess = <any>errmess);
  }

  refresh(): void {
    window.location.reload();
  }

  deleteFavorite(id: string) {
    console.log('Deleting Dish ' + id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites =>{ this.favorites = <Favorite[]>favorites, this.ngOnInit();},
        errmess => this.errMess = <any>errmess);
    this.delete = false;
    
  }

}
