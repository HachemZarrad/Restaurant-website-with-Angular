import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { resolve } from 'url';
import { HttpClientModule } from '@angular/common/http';
import { delay, map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, 
    private processHttpMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable <Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHttpMsgService.handleError));
    
  }
  getLeader(id : String): Observable <Leader> {
    return this.http.get<Leader>(baseURL + 'leadership' + id).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedLeader(): Observable <Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processHttpMsgService.handleError));
  
  }
}
