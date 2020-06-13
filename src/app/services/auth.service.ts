import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


interface AuthResponse {
  status: string;
  success: string;
  token: string;
  admin: Boolean;
  userId: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  admin: Subject<string> = new Subject<string>();
  userId : Subject<string> = new Subject<string>();
  authToken: string = undefined;
  
  
  
   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
   }

   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
       this.sendAdmin(res.user.admin);
       this.sendUserId(res.user._id);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

   sendAdmin(admin: string){
     this.admin.next(admin);
   }

   sendUserId(id: string){
     this.userId.next(id);
   }

   clearUsername() {
     this.username.next(undefined);
   }

   clearAdmin() {
     this.admin.next(undefined);
   }

   clearUserId(){
     this.userId.next(undefined);
   }

   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
        this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.sendAdmin(credentials.admin);
     this.sendUserId(credentials.userId);
     this.authToken = credentials.token;
    
   }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.clearAdmin();
     this.clearUserId();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }

   signUp(user: any): Observable<any> {
      return this.http.post<AuthResponse>(baseURL + 'users/signup',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
           this.storeUserCredentials({username: user.username, token: res.token, admin1: res.admin, admin: user.admin, userId: res.userId});
           return {'success': true, 'username': user.username, 'admin': res.admin, 'userId': res.userId };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
           this.storeUserCredentials({username: user.username, token: res.token, admin1: res.admin, admin: user.admin, userId: res.userId});
           return {'success': true, 'username': user.username, 'admin': res.admin, 'userId': res.userId };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   getAdmin(): Observable<string> {
      return this.admin.asObservable();
   }

   getUserId(): Observable<string>{
     return this.userId.asObservable();
   }


   getToken(): string {
     return this.authToken;
   }
}
