import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Subscription, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AdministrationService } from '../services/administration.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string = undefined;
  subscription: Subscription;
  adminstration: string = undefined;

  constructor(public dialog: MatDialog,
    private authService: AuthService) {
       
     }


    ngOnInit() {
      this.authService.loadUserCredentials();
      this.subscription = this.authService.getUsername()
      .subscribe(name => { console.log(name); this.username = name; 
         });
      this.subscription = this.authService.getAdmin()
      .subscribe(admin => { console.log(admin); this.adminstration = admin;})
         
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'})
      loginRef.afterClosed()
        .subscribe(result => {
          if(result){
            console.log(result);
            this.adminstration = result;
          }  
        });
    }

    openSignUpForm() {

      const signUpRef = this.dialog.open(SignUpComponent, {width: '500px', height: '450px'});
      signUpRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

    logOut() {
      this.username = undefined;
      this.adminstration = undefined;
      this.authService.logOut();
    }   

    
}
