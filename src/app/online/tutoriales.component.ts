import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { BackendService } from '../servicios/backend.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-tutoriales',
    templateUrl: './tutoriales.component.html',
    styleUrls: ['./tutoriales.component.css'],
      animations: [moveIn(), fallIn()],
      host: { '[@moveIn]': '' }
})
export class TutorialesComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data$: Observable<any>;
    toggleField: string;
    estado: string = '';
    guardarCambios = false;
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
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
        this.getEnrollmentCDs();
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.cargando = false;
    }

    getEnrollmentCDs() {
        this.cargando = true;
        this.querySubscription = this._backendService.getDocs('ENROLL_CD').subscribe((res) => {
            this.enrollmentCDs$ = res;
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

    getData(formData?) {
        this.cargando = true;
        this.querySubscription = this._backendService.getDocs('TUTORIALS',formData).subscribe((res) => {
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

    setData(formData) {
        this.cargando = true;
        this.querySubscription = this._backendService.setDoc('TUTORIALS',formData).then(res => {
            if (res) {
                this.guardarCambios = true;
                this.error = false;
                this.errorMsj = "";
                this.cargando = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMsj = err.message;
                this.cargando = false;
            }
        }
        );
    }

    updateData(formData) {
        this.cargando = true;
        this.querySubscription = this._backendService.updateDoc('TUTORIALS',formData._id,formData).then(res => {
            if (res) {
                this.guardarCambios = true;
                this.error = false;
                this.errorMsj = "";
                this.cargando = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMsj = err.message;
                this.cargando = false;
            }
        }
        );
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

    deleteDoc(docId) {
        if (confirm("¿Esta seguro?")) {
            this.cargando = true;
            this._backendService.deleteDoc('TUTORIALS',docId).then(res => {
                if (res) {
                    this.error = false;
                    this.errorMsj = "";
                    this.cargando = false;
                }
            }
            ).catch(err => {
                if (err) {
                    this.error = true;
                    this.errorMsj = err.message;
                    this.cargando = false;
                }
            }
            );
        }
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