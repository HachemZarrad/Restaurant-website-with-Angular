import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Dish } from '../shared/dish';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  
  feedbacksAlert: Boolean;
  leaderAlert: Boolean;
  leadersAlert: Boolean;
  promotionsAlert: Boolean;
  userId: String;
  confirmation: Boolean;
  
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(baseURL + 'users/')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }


    deleteUser(id: String){
      return this.http.delete(baseURL + 'users/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }
  
    getAdmins(): Observable<User[]> {
      return this.http.get<User[]>(baseURL + 'users?admin=true')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    postDish(dish : any): Observable<Dish> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<any>(baseURL + 'dishes/', dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    putDish(dish: Dish): Observable<Dish> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
       return this.http.put<Dish>(baseURL + 'dishes/' + dish._id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deleteDishes() {
      return this.http.delete(baseURL + 'dishes/')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    deleteDish(id: string) {
      return this.http.delete(baseURL + 'dishes/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    getLeaders(): Observable<Leader[]>{
      return this.http.get<Leader[]>(baseURL + 'leaders')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    postLeader(leader: any): Observable<Leader>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<Leader>(baseURL + 'leaders/', leader, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

      putLeader(leader: Leader): Observable<Leader> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
         return this.http.put<Leader>(baseURL + 'leaders/' + leader._id, leader, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }

    deleteLeader(id: String){
      return this.http.delete(baseURL + 'leaders/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    deleteLeaders(){
      return this.http.delete(baseURL + 'leaders/')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    getPromotions(): Observable<Promotion[]>{
      return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    postPromo(promo: any): Observable<Promotion>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<Promotion>(baseURL + 'promotions/', promo, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deletePromo(id: String){
      return this.http.delete(baseURL + 'promotions/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    deletePromotions(){
      return this.http.delete(baseURL + 'promotions/')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    putPromotion(promo: Promotion): Observable<Promotion> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
       return this.http.put<Promotion>(baseURL + 'promotions/' + promo._id, promo, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeedbacks(): Observable<Feedback[]>{
      return this.http.get<Feedback[]>(baseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deleteFeedback(id: String){
      return this.http.delete(baseURL + 'feedback/' + id)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    deleteFeedbacks(){
      return this.http.delete(baseURL + 'feedback/')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    uploadImage(event): Observable<any>{
  
      if (event.target.files.length > 0) {
        var file = event.target.files[0];
      }
  
      const formData = new FormData();
      formData.append('imageFile', file);
  
       return this.http.post<any>(baseURL + 'imageUpload', formData)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    gatherId(id: String){
      this.userId = id ;
    }
    
    getConfirmation(admin: Boolean){
       this.confirmation = admin;
    }

    deleteDishComment(dishId: string ,commentId: string){
      return this.http.delete(baseURL + 'dishes/' + dishId + '/comments/' + commentId)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    putDishComment(dishId: string, commentId: string, newComment: Comment){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
       return this.http.put(baseURL + 'dishes/' + dishId + '/comments/' + commentId , newComment, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deletePromoComment(promoId: string ,commentId: string){
      return this.http.delete(baseURL + 'promotions/' + promoId + '/comments/' + commentId)
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
    }

    putPromoComment(promoId: string, commentId: string, newComment: Comment){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
       return this.http.put(baseURL + 'promotions/' + promoId + '/comments/' +commentId , newComment, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getUserByName(name: string): Observable<User[]> {
      return this.http.get<User[]>(baseURL + 'users/' + 'filter/' + name)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeedByUsername(name: string): Observable<Feedback[]> {
      return this.http.get<Feedback[]>(baseURL + 'feedback/' + 'filter/' + name)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeedbackIds(): Observable<number[] | any> {
      return this.getFeedbacks().pipe(map(feedbacks => feedbacks.map(feedback => feedback._id)))
        .pipe(catchError(error => error));
    }

    getUsersIds(): Observable<number[] | any> {
      return this.getUsers().pipe(map(users => users.map(user => user._id)))
        .pipe(catchError(error => error));
    }


    getFeedback(id: string): Observable<Feedback> {
      return this.http.get<Feedback>(baseURL + 'feedback/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getUser(id: string): Observable<User> {
      return this.http.get<User>(baseURL + 'users/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

  }

