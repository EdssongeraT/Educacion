import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { BackendService } from '../servicios/backend.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-calificacion',
    templateUrl: './calificacion.component.html',
    styleUrls: ['./calificacion.component.css'],
    animations: [moveIn(), fallIn()],
    host: { '[@moveIn]': '' }
})
export class CalificacionComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data$;
    toggleField: string;
    estado: string = '';
    guardarCambios = false;
    error: boolean = false;
    errorMsj: String = "";
    cargando: boolean = false;
    private querySubscription;

    total_amount = 0;
    addDataForm: FormGroup;
    editDataForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['code', 'descr', 'studentcode', 'studentdescr', 'studentLAST_NAME', '_id'];


    constructor(private _backendService: BackendService, private _fb: FormBuilder, private _router: ActivatedRoute) { }
    ngOnInit() {
        let id = this._router.snapshot.paramMap.get('id');
        if (id != "") { this.getStudent(id); }
        this.toggleField = (!id) ? "searchMode" : "addMode";
        this.error = false;
        this.errorMsj = "";
        this.dataSource = new MatTableDataSource(this.members);
        this.addDataForm = this._fb.group({
            studentdocid: ['', Validators.required],
            studentcode: ['', Validators.required],
            studentdescr: ['', Validators.required],
            studentLAST_NAME: ['', Validators.required],
            studentfeecd: ['', Validators.required],
            paiddate: ['', Validators.required],
            code: ['', Validators.required],
            descr: ['', Validators.required],
            line: this._fb.array([]),
            gamount: ''
        });
        this.editDataForm = this._fb.group({
            _id: ['', Validators.required],
            studentdocid: ['', Validators.required],
            studentcode: ['', Validators.required],
            studentdescr: ['', Validators.required],
            studentLAST_NAME: ['', Validators.required],
            studentfeecd: ['', Validators.required],
            paiddate: ['', Validators.required],
            code: ['', Validators.required],
            descr: ['', Validators.required],
            line: this._fb.array([]),
            gamount: ''
        });
    }

    LINES(formName) {
        return this[formName].get('line') as FormArray;
    }
    addLINES(formName) {
        this.LINES(formName).push(this._fb.group({
            subject: ['', Validators.required],
            minmarks: ['', Validators.required],
            maxmarks: ['', Validators.required],
            marks: ['', [Validators.pattern("^[0-9]*$")]]
        }));
        this.calculateTotal(formName);
    }
    deleteLINES(index, formName) {
        this.LINES(formName).removeAt(index);
        this.calculateTotal(formName);
    }
    calculateTotal(formName) {
        this.total_amount = 0;
        for (let i = 0; i <= this[formName].value.line.length; i++) {
            if (this[formName].value.line[i]) {
                this.total_amount +=+ (this[formName].value.line[i].marks);
            }
        }
        this.total_amount=this.total_amount/(this[formName].value.line.length)
        this[formName].controls['gamount'].setValue(this.total_amount.toFixed(0));
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
        this.cargando = false;
    }

    getData(formData?) {
        this.cargando = true;
        this.querySubscription = this._backendService.getDocs('MARKS', formData).subscribe((res) => {
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
        this.querySubscription = this._backendService.setDoc('MARKS', formData).then(res => {
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
        this.querySubscription = this._backendService.updateDoc('MARKS', formData._id, formData).then(res => {
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
        });
    }

    getDoc(docId) {
        this.cargando = true;
        this.data$ = this._backendService.getDoc('MARKS', docId).subscribe(res => {
            if (res) {
                this.data$ = res;
                this.editDataForm = this._fb.group({
                    _id: ['', Validators.required],
                    studentdocid: ['', Validators.required],
                    studentcode: ['', Validators.required],
                    studentdescr: ['', Validators.required],
                    studentLAST_NAME: ['', Validators.required],
                    studentfeecd: ['', Validators.required],
                    paiddate: ['', Validators.required],
                    code: ['', Validators.required],
                    descr: ['', Validators.required],
                    line: this._fb.array([]
                    ),
                    gamount: ''
                });
                this.editDataForm.patchValue(this.data$);

                for (let i = 0; i < this.data$["line"].length; i++) {
                    this.LINES('editDataForm').push(this._fb.group(this.data$["line"][i]));
                }
                this.calculateTotal(('editDataForm'));
                this.toggle('editMode');
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

    deleteDoc(docId) {
        if (confirm("¿Estas seguro ?")) {
            this.cargando = true;
            this._backendService.deleteDoc('MARKS', docId).then(res => {
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
    getStudent(id) {
        this.querySubscription = this.querySubscription = this._backendService.getDoc('STUDENT', id).subscribe((res) => {
            this.addDataForm.controls["studentdocid"].patchValue(res["_id"]);
            this.addDataForm.controls["studentcode"].patchValue(res["code"]);
            this.addDataForm.controls["studentdescr"].patchValue(res["descr"]);
            this.addDataForm.controls["studentLAST_NAME"].patchValue(res["LAST_NAME"]);
            this.addDataForm.controls["studentfeecd"].patchValue(res["MARKS_CODE"]);

            this._backendService.getDoc("MARKS_CD", res["MARKS_CODE"]).subscribe((res2) => {
                if (res2["code"] !== "") {
                    this.data$ = res2;
                    this.addDataForm.patchValue(this.data$);
                    this.addDataForm.controls["code"].patchValue("");

                    for (let i = 0; i < this.data$["line"].length; i++) {
                        this.LINES('addDataForm').push(this._fb.group(this.data$["line"][i]));
                    }
                    this.calculateTotal(('addDataForm'));
                }
            });
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