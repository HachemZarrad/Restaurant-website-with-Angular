import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { FavoriteService } from './services/favorite.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdministrationService } from './services/administration.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';
import { FavoritesComponent } from './favorites/favorites.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { from } from 'rxjs';
import { AdministratorComponent } from './administrator/administrator.component';
import { DishesManagementComponent } from './dishes-management/dishes-management.component';
import { LeadersManagementComponent } from './leaders-management/leaders-management.component';
import { ClientsComponent } from './clients/clients.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { LeaderformComponent } from './leaderform/leaderform.component';
import { LeaderdetailComponent } from './leaderdetail/leaderdetail.component';
import { DishformComponent } from './dishform/dishform.component';
import { UpdateDishComponent } from './update-dish/update-dish.component';
import { PromosManagementComponent } from './promos-management/promos-management.component';
import { PromoformComponent } from './promoform/promoform.component';
import { UpdatepromoComponent } from './updatepromo/updatepromo.component';
import { UserDeleteAlertComponent } from './user-delete-alert/user-delete-alert.component';
import { PromoDetailComponent } from './promodetail/promodetail.component';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    FavoritesComponent,
    SignUpComponent,
    AdministratorComponent,
    DishesManagementComponent,
    LeadersManagementComponent,
    ClientsComponent,
    FeedbacksComponent,
    ListOfUsersComponent,
    AlertsComponent,
    PromotionsComponent,
    PromoDetailComponent,
    LeaderformComponent,
    LeaderdetailComponent,
    DishformComponent,
    UpdateDishComponent,
    PromosManagementComponent,
    PromoformComponent,
    UpdatepromoComponent,
    UserDeleteAlertComponent,
    FeedbackDetailComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    {provide: 'baseURL', useValue: baseURL},
    ProcessHTTPMsgService,
    FeedbackService,
    AuthService,
    AuthGuardService,
    FavoriteService,
    AdministrationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    LoginComponent,
    SignUpComponent,
    AlertsComponent,
    LeaderformComponent,
    DishformComponent,
    PromoformComponent,
    UserDeleteAlertComponent,
    FeedbackDetailComponent,
    UserDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
