import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { BackendService } from '../servicios/backend.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    animations: [moveIn(), fallIn()],
    host: { '[@moveIn]': '' }
})
export class CursosComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    data$: Observable<any>;
    toggleField: string;
    estado: string = '';
    guardarCambioso = false;
    error: boolean = false;
    errorMsj: String = "";
    cargando: boolean = false;
    private querySubscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['code', 'descr', '_id'];

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.cargando = false;
    }
    getData(formData?) {
        this.cargando = true;
        this.querySubscription = this._backendService.getDocs('ENROLL_CD',formData).subscribe((res) => {
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
        this.querySubscription = this._backendService.setDoc('ENROLL_CD',formData).then(res => {
            if (res) {
                this.guardarCambioso = true;
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
        this.querySubscription = this._backendService.updateDoc('ENROLL_CD',formData._id,formData).then(res => {
            if (res) {
                this.guardarCambioso = true;
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
        this.cargando = true;
        this.data$ = this._backendService.getDoc('ENROLL_CD',docId);
        this.toggle('editMode');
        this.cargando = false;
    }

    deleteDoc(docId) {
        if (confirm("Are you sure want to delete this record ?")) {
            this.cargando = true;
            this._backendService.deleteDoc('ENROLL_CD',docId).then(res => {
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

    //mat table paginator and filter functions
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
    // applyFilter(filterValue: string) {
    //     filterValue = filterValue.trim(); // Remove whitespace
    //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //     this.dataSource.filter = filterValue;
    // }
    ngOnDestroy() {
        // this is not needed when observable is used, in this case, we are registering user on subscription
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
    }
}