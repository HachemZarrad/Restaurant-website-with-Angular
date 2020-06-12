import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotionsIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promo => promo._id)))
      .pipe(catchError(error => error));
  }

  postComment(promoId: string, comment: any) {
    return this.http.post(baseURL + 'promotions/' + promoId + '/comments', comment)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getComments(promoId: string){
    return this.http.get<Comment[]>(baseURL + 'promotions/' + promoId + '/comments')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
