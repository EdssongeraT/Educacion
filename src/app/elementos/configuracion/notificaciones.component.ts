import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animation';
import { BackendService } from '../../servicios/backend.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class NotificacionesComponent implements OnInit {
  data;
  data$;
  toggle: boolean = false;
  state: string = '';
  guardarCambios = false;
  error: boolean = false;
  errorMsj: String = "";
  Cargando: boolean = false;

  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.getDoc();
  }

  getDoc() {
    this.Cargando = true;
    this.data$ = this._backendService.getUserStudentMSGDoc();
    this.Cargando= false;
  }
  updateReceipt(messageId){

  }
}