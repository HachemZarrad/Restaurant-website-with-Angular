import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { AdministratorComponent } from '../administrator/administrator.component';
import { ClientsComponent } from '../clients/clients.component';
import { LeadersManagementComponent } from '../leaders-management/leaders-management.component';
import { DishesManagementComponent } from '../dishes-management/dishes-management.component';
import { ListOfUsersComponent } from '../list-of-users/list-of-users.component';
import { FeedbacksComponent } from '../feedbacks/feedbacks.component';
import { PromotionsComponent } from '../promotions/promotions.component';
import { PromoDetailComponent } from '../promodetail/promodetail.component';
import { LeaderformComponent } from '../leaderform/leaderform.component';
import { LeaderdetailComponent } from '../leaderdetail/leaderdetail.component';
import { DishformComponent } from '../dishform/dishform.component';
import { UpdateDishComponent } from '../update-dish/update-dish.component';
import { PromosManagementComponent } from '../promos-management/promos-management.component';
import { PromoformComponent } from '../promoform/promoform.component';
import { UpdatepromoComponent } from '../updatepromo/updatepromo.component';
import { FeedbackDetailComponent } from '../feedback-detail/feedback-detail.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'favorites',     component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'promodetail/:id', component: PromoDetailComponent },
  {path: 'updateDish/:id', component: UpdateDishComponent},
  {path: 'updatePromo/:id', component: UpdatepromoComponent},
  { path: 'feedbackdetail/:id', component: FeedbackDetailComponent},
  { path: 'userdetail/:id', component: UserDetailComponent},
  { path: 'administration', component: AdministratorComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'leadersMangement', component: LeadersManagementComponent},
  { path: 'dishesMangement', component: DishesManagementComponent},
  { path: 'usersList', component: ListOfUsersComponent},
  {path: 'feedbacks', component: FeedbacksComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'leaderForm', component: LeaderformComponent},
  {path: 'leaderdetail/:id', component: LeaderdetailComponent},
  {path: 'dishForm', component: DishformComponent},
  {path: 'promoManagement', component: PromosManagementComponent},
  {path: 'promoForm', component: PromoformComponent},
  

];
