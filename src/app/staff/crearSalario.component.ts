import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../elementos/router.animation';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../servicios/backend.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crearSalario',
  templateUrl: './crearSalario.component.html',
  styleUrls: ['./crearSalario.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class CrearSalarioComponent implements OnInit, OnDestroy {

  members: any[];
  dataSource: MatTableDataSource<any>;
  myDocData;
  data$: any;
  toggleField: string;
  estado: string = '';
  guardarCambio = false;
  error: boolean = false;
  errorMsj: String = "";
  cargando: boolean = false;
  private querySubscription;

  pCDs = ['Aumento', 'Reduccion'];
  freqCDs = ['Quincenal', 'Mensual', 'Anual', 'Un solo pago', 'Otro'];
  total_amount = 0;
  addDataForm: FormGroup;
  editDataForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['code', 'descr', '_id'];

  constructor(private _backendService: BackendService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.toggleField = "searchMode";
    this.error = false;
    this.errorMsj = "";
    this.dataSource = new MatTableDataSource(this.members);
    this.addDataForm = this._fb.group({
      code: ['', Validators.required],
      descr: ['', Validators.required],
      bsalary: ['', Validators.required],
      line: this._fb.array([this._fb.group({
        frequency: ['', Validators.required],
        ptype: ['', Validators.required],
        payval: ['', Validators.required],
        amount: ['', [Validators.pattern("^[0-9]*$")]]
      })]),
      gamount: ''
    });
    this.editDataForm = this._fb.group({
      _id: ['', Validators.required],
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
        if (this[formName].value.line[i].ptype == 'Allowance') {
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
    this.querySubscription = this._backendService.getDocs('SALARY_CD', formData).subscribe((res) => {
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
    this.querySubscription = this._backendService.setDoc('SALARY_CD', formData).then(res => {
      if (res) {
        this.guardarCambio = true;
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
    this.querySubscription = this._backendService.updateDoc('SALARY_CD', formData._id, formData).then(res => {
      if (res) {
        this.guardarCambio = true;
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
    this._backendService.getDoc('SALARY_CD', docId).subscribe(res => {
      if (res) {
        this.data$ = res;
        this.editDataForm = this._fb.group({
          _id: ['', Validators.required],
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
    if (confirm("¿Esta seguro?")) {
      this.cargando = true;
      this._backendService.deleteDoc('SALARY_CD', docId).then(res => {
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