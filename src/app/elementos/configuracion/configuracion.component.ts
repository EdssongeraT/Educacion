import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../servicios/backend.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
      imports: [
         FormsModule
      ]
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  Estado: string = '';
  guardarCambios = false;
  error: boolean = false;
  errorMsj: String = "";
  Cargando: boolean = false;
  data$: Observable<any>;
  private querySubscription;
  roles: any[] = [
    { value: 'student', viewValue: 'Estudiante' },
    { value: 'parent', viewValue: 'Padre o tutor' },
    { value: 'staff', viewValue: 'Staff' },
    { value: 'admin', viewValue: 'Admin' },
    { value: 'teacher', viewValue: 'Docente' }
  ];

  constructor(private _backendService: BackendService, private _router: Router) {
  }

  ngOnInit() {
      this.getUserDoc();
  }

  logout() {
    this._backendService.logout()
      .then(
        (success) => {
          this._router.navigate(['/login']);
        }).catch(function (error) {
          console.log(error);
        })
  }

  getUserDoc() {
    this.Cargando = true;
    this.data$ = this._backendService.getUserDoc();
    this.Cargando = false;
  }

  onSubmit(formData) {
    this.Cargando = true;
    this._backendService.updateUser(formData).then(res => {
      if (res) {
        this.guardarCambios = true;
        this.error = false;
        this.errorMsj = "";
        this.Cargando = false;
        window.localStorage.setItem("role", formData.role);
      }
    }
    ).catch(err => {
      if (err) {
        this.error = true;
        this.errorMsj = err.message;
        this.Cargando = false;
      }
    }
    );
  }

  routeLoginPage() {
    this.error = false;
    this.errorMsj = "";
    this.guardarCambios = false;
  }
}