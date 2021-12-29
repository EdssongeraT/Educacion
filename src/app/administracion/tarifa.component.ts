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
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css'],
  animations: [moveIn(), fallIn()], 
  host: { '[@moveIn]': '' }
})
export class TarifaComponent implements OnInit, OnDestroy {

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

  pCDs = ['Paid Amount', 'Discount'];
  freqCDs = ['Bi-Weekly', 'Monthly', 'Yearly', 'One-time', 'OTHER'];
  total_amount = 0;
  addDataForm: FormGroup;
  editDataForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['code', 'descr', 'studentcode', 'studentdescr', 'studentLAST_NAME', '_id'];


  constructor(private _backendService: BackendService, private _fb: FormBuilder, private _router: ActivatedRoute) { }

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    if(id !="") { this.getStudent(id); }
    this.toggleField = (!id) ? "searchMode" : "addMode";
    //this.toggleField = "searchMode";
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
      bsalary: ['', Validators.required],
      // line: this._fb.array([this._fb.group({
      //   frequency: ['', Validators.required],
      //   ptype: ['', Validators.required],
      //   payval: ['', Validators.required],
      //   amount: ['', [Validators.pattern("^[0-9]*$")]]
      // })]),
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
      bsalary: ['', Validators.required],
      line: this._fb.array([]),
      gamount: ''
    });
  }

  LINES(formName) {
     return this[formName].get('line') as FormArray;
  }
  addLINES(formName) {
    this.LINES(formName).push(this._fb.group({
      frequency: ['', Validators.required],
      ptype: ['', Validators.required],
      payval: ['', Validators.required],
      amount: ['', [Validators.pattern("^[0-9]*$")]]
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
        if (this[formName].value.line[i].ptype == 'Paid Amount') {
          this.total_amount += +this[formName].value.line[i].amount;
        } else {
          this.total_amount -= +this[formName].value.line[i].amount;
        }
      }
    }
    this.total_amount += parseFloat(this[formName].controls['bsalary'].value);
    this[formName].controls['gamount'].setValue(this.total_amount.toFixed(2));
  }

  toggle(filter?) {
    if (!filter) { filter = "searchMode" }
    else { filter = filter; }
    this.toggleField = filter;
    this.cargando = false;
  }
 
  getData(formData?) {
    this.cargando = true;
        this.querySubscription = this._backendService.getDocs('FEE', formData).subscribe((res) => {
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
    this.querySubscription = this._backendService.setDoc('FEE', formData).then(res => {
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
    this.querySubscription = this._backendService.updateDoc('FEE', formData._id, formData).then(res => {
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
    this.data$ = this._backendService.getDoc('FEE', docId).subscribe(res => {
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
          bsalary: ['', Validators.required],
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
    if (confirm("Are you sure want to delete this record ?")) {
      this.cargando = true;
      this._backendService.deleteDoc('FEE', docId).then(res => {
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
    // this.cargando = true;
    this.querySubscription = this._backendService.getDoc('STUDENT', id).subscribe((res) => {
        this.addDataForm.controls["studentdocid"].patchValue(res["_id"]);
        this.addDataForm.controls["studentcode"].patchValue(res["code"]);
        this.addDataForm.controls["studentdescr"].patchValue(res["descr"]);
        this.addDataForm.controls["studentLAST_NAME"].patchValue(res["LAST_NAME"]);
        this.addDataForm.controls["studentfeecd"].patchValue(res["FEE_CODE"]);

        this._backendService.getDoc("FEE_CD", res["FEE_CODE"]).subscribe((res2) => {
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
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
  ngOnDestroy() {
    // this is not needed when observable is used, in this case, we are registering user on subscription
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}