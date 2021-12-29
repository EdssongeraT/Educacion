import { Component, OnInit, OnDestroy } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { BackendService } from '../servicios/backend.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mostrarEstudiante',
  templateUrl: './mostrarEstudiante.component.html',
  styleUrls: ['./mostrarEstudiante.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class MostrarEstudianteComponent implements OnInit, OnDestroy {
  data;
  estado: string = '';
  guardaCambios = false;
  error: boolean = false;
  errorMsj: String = "";
  cargando: boolean = false;
  private querySubscription;

  docId: string;
  fileName: string;
  showFileUpload: boolean = false;
  showDocument: boolean = false;
  docUrl: Observable<string | null>;

  constructor(private _backendService: BackendService) { }

  ngOnInit() {
    this.getDoc();
  }

  getDoc() {
    this.cargando = true; 
    this.cargando = false;
    this.querySubscription = this._backendService.getUserStudentDoc()
    .subscribe(res => {
      if (res.length > 0) {
        this.data = res[0];
        this.docId = res[0]["_id"];
      } else {
        this.error = true;
        this.errorMsj = "Tu contraseña no coincide.";
        this.cargando = false;
      }
    },
          (error) => {
              this.error = true;
              this.errorMsj = error.message;
              this.cargando = false;
          },
          () => {
              this.cargando = false;
          });
  }
  getDocUrl(docUrl) {
    this.fileName = docUrl;
    this.docUrl = this._backendService.getFileDownloadUrl(docUrl);
  }
  ngOnDestroy() {
    if (this.querySubscription) {
        this.querySubscription.unsubscribe();
    }
}
}