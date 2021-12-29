import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { BackendService } from '../servicios/backend.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-verTutoriales',
  templateUrl: './verTutoriales.component.html',
  styleUrls: ['./verTutoriales.component.css'],
      animations: [moveIn(), fallIn()],
      host: { '[@moveIn]': '' }
})
export class VerTutorialesComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data$: Observable<any>;
    toggleField: string;
    estado: string = '';
    guardarCambio = false;
    error: boolean = false;
    errorMsj: String = "";
    cargando: boolean = false;
    private querySubscription;
    showFileUpload: boolean = false;
    showDocument: boolean = false;
    docId: string;
    docUrl: Observable<string | null>;
    fileName: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['code', 'descr', '_id'];
    enrollmentCDs$;

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "resMode";
        this.dataSource = new MatTableDataSource(this.members);
        this.getData();
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.cargando = false;
    }

    getData(formData?) {
        this.cargando = true;
          this.querySubscription = this._backendService.getUserStudentTutsDoc('TUTORIALS').subscribe((res) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

    getDoc(docId) {
        this.docId = docId; 
        this.cargando = true;
        this.data$ = this._backendService.getDoc('TUTORIALS',docId);
        this.toggle('editMode');
        this.cargando = false;
    }
    getDocUrl(docUrl){
        this.fileName = docUrl;
        this.docUrl = this._backendService.getFileDownloadUrl(docUrl);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    ngOnDestroy() {
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
    }
}