import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  auth = new FirebaseTSAuth();
  private router :Router;
  constructor() { }

  ngOnInit(): void {
  }
  loggedIn(){
    return this.auth.isSignedIn();
  }
  
  salirCuenta(){
    this.auth.signOut();
    this.router.navigateByUrl('');
  }
}
