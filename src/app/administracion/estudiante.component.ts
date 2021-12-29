import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { BackendService } from '../servicios/backend.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-estudiante',
    templateUrl: './estudiante.component.html',
    styleUrls: ['./estudiante.component.css'],
    animations: [moveIn(), fallIn()],
    host: { '[@moveIn]': '' }
})
export class EstudianteComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data$: Observable<any>;
    toggleField: string;
    estado: string = '';
    guardarCambios = false;
    error: boolean = false;
    errorMsj: String = "";
    guardarcambios: boolean = false;
    private querySubscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['code', 'descr', '_id'];
    feeCDs$;
    marksCDs$;
    enrollmentCDs$;

    docId: string;
    fileName: string;
    showFileUpload: boolean = false;
    showDocument: boolean = false;
    docUrl: Observable<string | null>;

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
        this.getMarksCDs();
        this.getEnrollmentCDs();
        this.getFeeCDs();
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.guardarcambios = false;
    }

    getEnrollmentCDs() {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.getDocs('ENROLL_CD').subscribe((res) => {
            this.enrollmentCDs$ = res;
        },
            (error) => {
                this.error = true;
                this.errorMsj = error.message;
                this.guardarcambios = false;
            },
            () => {
                this.guardarcambios = false;
            });
    }
    getMarksCDs() {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.getDocs('MARKS_CD').subscribe((res) => {
            this.marksCDs$ = res;
        },
            (error) => {
                this.error = true;
                this.errorMsj = error.message;
                this.guardarcambios = false;
            },
            () => {
                this.guardarcambios = false;
            });
    }
    getFeeCDs() {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.getDocs('FEE_CD').subscribe((res) => {
            this.feeCDs$ = res;
        },
            (error) => {
                this.error = true;
                this.errorMsj = error.message;
                this.guardarcambios = false;
            },
            () => {
                this.guardarcambios = false;
            });
    }

    getData(formData?) {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.getDocs('STUDENT',formData).subscribe((res) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        },
            (error) => {
                this.error = true;
                this.errorMsj = error.message;
                this.guardarcambios = false;
            },
            () => { 
                this.guardarcambios = false;
            });
    }

    setData(formData) {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.setDoc('STUDENT',formData).then(res => {
            if (res) {
                this.guardarCambios = true;
                this.error = false;
                this.errorMsj = "";
                this.guardarcambios = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMsj = err.message;
                this.guardarcambios = false;
            }
        }
        );
    }

    updateData(formData) {
        this.guardarcambios = true;
        this.querySubscription = this._backendService.updateDoc('STUDENT',formData._id,formData).then(res => {
            if (res) {
                this.guardarCambios = true;
                this.error = false;
                this.errorMsj = "";
                this.guardarcambios = false;
            }
        }
        ).catch(err => {
            if (err) {
                this.error = true;
                this.errorMsj = err.message;
                this.guardarcambios = false;
            }
        }
        );
    }

    getDoc(docId) {
        this.docId = docId; 
        this.guardarcambios = true;
        this.data$ = this._backendService.getDoc('STUDENT',docId);
        this.toggle('editMode');
        this.guardarcambios = false;
    } 
    getDocUrl(docUrl){
        this.fileName = docUrl;
        this.docUrl = this._backendService.getFileDownloadUrl(docUrl);
    }

    deleteDoc(docId) {
        if (confirm("¿Esta seguro?")) {
            this.guardarcambios = true;
            this._backendService.deleteDoc('STUDENT',docId).then(res => {
                if (res) {
                    this.error = false;
                    this.errorMsj = "";
                    this.guardarcambios = false;
                }
            }
            ).catch(err => {
                if (err) {
                    this.error = true;
                    this.errorMsj = err.message;
                    this.guardarcambios = false;
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