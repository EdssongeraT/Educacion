import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../servicios/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  state: string = '';
  error: any;
  cargando: boolean = false;
  falloConexion = false;
  guardarcambios = false;

  constructor(private _backendService: BackendService, private _router: Router) {
  }
  ngOnInit() { 
  } 
  routeLoginPage() {
    this._router.navigate(['/login']);
  }

  onSubmit(formData) {
    this.cargando = true;
    this._backendService.createUser(formData).then(
      (success) => {
        this.cargando = false;
        this.guardarcambios = true;
      },
      (error) => {
        this.error = error;
        this.cargando = false;
        this.guardarcambios = false;
      }
    );
  }
}