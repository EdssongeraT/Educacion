import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  firebasetsAuth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;

  constructor() {
    this.firestore = new FirebaseTSFirestore();
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  ngOnInit(): void {
  }
  /*registroCP: HTMLInputElement,
  registroCalle: HTMLInputElement,
  registroColonia: HTMLInputElement,
  registroTelefono: HTMLInputElement

  //let NoControl= registroNoControl.valueAsNumber;
  let Nombre = registroNombre.value;
  let ApellidoP = registroApellidoP.value;
  let ApellidoM = registroApellidoM.value;
  let Tipo = registroTipo.value;
  let Fecha = registroFecha.valueAsDate;
  let Departamento = registroDepartamento.value;
  let CodigoPostal = registroCP.valueAsNumber;
  let Calle = registroCalle.value;
  let Colonia = registroColonia.value;
  let Telefono = registroTelefono.valueAsNumber;*/

  alRegistrarAlumno(
    registroCorreo: HTMLInputElement,
    registroContrasena: HTMLInputElement,
    registroNoControl: HTMLInputElement,
    registroNombre: HTMLInputElement,
    registroApellidoP: HTMLInputElement,
    registroApellidoM: HTMLInputElement,
    registroFecha: HTMLInputElement,
    registroCarrera: HTMLSelectElement
  ) {
    //autenticacion
    let correo = registroCorreo.value;
    let contrasena = registroContrasena.value;
    //coincidir user y alumnos
    var id = "no jalo";
    //Resto de datos
    let NoControl = registroNoControl.valueAsNumber;
    let Nombre = registroNombre.value;
    let ApellidoP = registroApellidoP.value;
    let ApellidoM = registroApellidoM.value;
    let Fecha = registroFecha.valueAsDate;
    let Carrera = registroCarrera.value;
    let CodigoPostal = 0;
    let Calle = "";
    let Colonia = "";
    let Telefono = "";
    //anade a authentication
    if (this.noVacia(correo) && this.noVacia(contrasena)) {
      this.firebasetsAuth.createAccountWith(
        {
          email: correo,
          password: contrasena,
          onComplete: (uc) => {
            id = uc.user?.uid!;
            //alert(id);
            registroCorreo.value = "",
            registroContrasena.value = "";
            //anadir a bd de alumnos
            this.firestore.create(
              {
                path: ["Alumnos", id],
                data: {
                  NoControl: NoControl,
                  Nombre: Nombre,
                  ApellidoP: ApellidoP,
                  ApellidoM: ApellidoM,
                  Fecha: Fecha,
                  Carrera: Carrera,
                  CodigoPostal: CodigoPostal,
                  Calle: Calle,
                  Colonia: Colonia,
                  Telefono: Telefono

                },
                onComplete: (docId) => {
                  alert("Cuenta creada con exito " + id)
                  registroNoControl.valueAsNumber = 0;
                  registroNombre.value = "";
                  registroApellidoP.value = "";
                  registroApellidoM.value = "";
                  registroFecha.valueAsDate = null;
                  registroCarrera.value = "";
                  id = "";
                },
                onFail: (erro) => {
                  alert("error al crear usuario");
                }
              }
            );
          },
          onFail: (err) => {
            alert("error al crear cuenta" + err);
          }
        }
      );
    }

  }

  alRegistrarMaestro(
    registroCorreo: HTMLInputElement,
    registroContrasena: HTMLInputElement,
    registroNoControl: HTMLInputElement,
    registroNombre: HTMLInputElement,
    registroApellidoP: HTMLInputElement,
    registroApellidoM: HTMLInputElement,
    registroFecha: HTMLInputElement,
    registroMateria: HTMLSelectElement,
    registroCP: HTMLInputElement,
    registroCalle: HTMLInputElement,
    registroColonia: HTMLInputElement,
    registroTelefono: HTMLInputElement
  ) {
    //autenticacion
    let correo = registroCorreo.value;
    let contrasena = registroContrasena.value;
    //coincidir user y alumnos
    let id = "";
    //Resto de datos
    let NoControl = registroNoControl.valueAsNumber;
    let Nombre = registroNombre.value;
    let ApellidoP = registroApellidoP.value;
    let ApellidoM = registroApellidoM.value;
    let Fecha = registroFecha.valueAsDate;
    let Materia = registroMateria.value;
    let CodigoPostal = registroCP.valueAsNumber;
    let Calle = registroCalle.value;
    let Colonia = registroColonia.value;
    let Telefono = registroTelefono.value;

    if (this.noVacia(correo) && this.noVacia(contrasena)) {
      this.firebasetsAuth.createAccountWith(
        {
          email: correo,
          password: contrasena,
          onComplete: (uc) => {
            id = uc.user?.uid!;
            registroCorreo.value = "",
              registroContrasena.value = "";
          },
          onFail: (err) => {
            alert("error al crear cuenta" + err);
          }
        }
      );
    }

    this.firestore.create(
      {
        path: ["Docentes", id],
        data: {
          NoControl: NoControl,
          Nombre: Nombre,
          ApellidoP: ApellidoP,
          ApellidoM: ApellidoM,
          Fecha: Fecha,
          Materia: Materia,
          CodigoPostal: CodigoPostal,
          Calle: Calle,
          Colonia: Colonia,
          Telefono: Telefono

        },
        onComplete: (docId) => {
          alert("Cuenta creada con exito " + id)
          registroNoControl.valueAsNumber = 0;
          registroNombre.value = "";
          registroApellidoP.value = "";
          registroApellidoM.value = "";
          registroFecha.valueAsDate = null;
          registroMateria.value = "";
          registroCP.valueAsNumber = 0;
          registroCalle.value = "";
          registroColonia.value = "";
          registroTelefono.value = "";
        },
        onFail: (err) => {
          alert("error al crear usuario");
        }
      }
    );
  }
  noVacia(texto: string) {
    return texto != null && texto.length > 0;
  }

}
