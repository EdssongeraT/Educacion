import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Educacion';
  auth = new FirebaseTSAuth();
  private router :Router;

  constructor(){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              
            },
            whenSignedOut: user => {
              
            },
            whenChanged: user => {

            }
          }
        );
        }
    );
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }
  
  salirCuenta(){
    this.auth.signOut();
    this.router.navigateByUrl('');
  }
}


