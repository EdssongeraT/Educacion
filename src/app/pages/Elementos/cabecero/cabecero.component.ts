import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  private router :Router;
  constructor() { }

  ngOnInit(): void {
  }
  loggedIn(){

  }
  
  salirCuenta(){

    this.router.navigateByUrl('');
  }
}
