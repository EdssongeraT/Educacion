import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { BackendService } from '../../servicios/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  socialAuth: boolean = false; 
  error: any;
  cargando: boolean = false;
  brokenNetwork = false;

  constructor(public afAuth: AngularFireAuth, private _backendService: BackendService) { }

  ngOnInit() {
    this.socialAuth = environment.socialAuthEnabled;
  }
  ngAfterViewInit() {
    if (!localStorage.getItem("uid")) {
      this.afAuth.user.subscribe(res => {
        if (res) {
          window.localStorage.setItem("uid", res.uid);
          window.localStorage.setItem("displayName", res.displayName);
          window.localStorage.setItem("email", res.email);
          window.localStorage.setItem("picture", res.photoURL);
        }
      });
    }
  }
  login(loginType, formData?) {

    this._backendService.login(loginType, formData);
  }
  logout() {
    this._backendService.logout()
     .then(
       (success) => {

     window.localStorage.removeItem("uid");
     window.localStorage.removeItem("displayName");
     window.localStorage.removeItem("email");
     window.localStorage.removeItem("picture");
     window.localStorage.removeItem("role");
     }).catch(function (error) {
         console.log(error);
       })
    }
}