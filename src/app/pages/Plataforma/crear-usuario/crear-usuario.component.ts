import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  firebasetsAuth: FirebaseTSAuth;

  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  ngOnInit(): void {
  }
  /* registroNoControl: HTMLInputElement,*/

  /*registroNombre: HTMLInputElement,
  registroApellidoP: HTMLInputElement,
  registroApellidoM: HTMLInputElement,
  registroTipo: HTMLInputElement,
  registroFecha: HTMLInputElement,
  registroDepartamento: HTMLInputElement,
  registroCP: HTMLInputElement,
  registroCalle: HTMLInputElement,
  registroColonia: HTMLInputElement,
  registroTelefono: HTMLInputElement*/

  //let NoControl= registroNoControl.valueAsNumber;
  /*let Nombre = registroNombre.value;
  let ApellidoP = registroApellidoP.value;
  let ApellidoM = registroApellidoM.value;
  let Tipo = registroTipo.value;
  let Fecha = registroFecha.valueAsDate;
  let Departamento = registroDepartamento.value;
  let CodigoPostal = registroCP.valueAsNumber;
  let Calle = registroCalle.value;
  let Colonia = registroColonia.value;
  let Telefono = registroTelefono.valueAsNumber;*/

  alRegistrarClick(registroCorreo: HTMLInputElement, registroContrasena: HTMLInputElement) {
    let correo = registroCorreo.value;
    let contrasena = registroContrasena.value;

    if (this.noVacia(correo) && this.noVacia(contrasena)) {
      this.firebasetsAuth.createAccountWith(
        {
          email: correo,
          password: contrasena, 
          onComplete: (uc) => {
            alert("cuenta creada");
            registroCorreo.value = "",
              registroContrasena.value = "";
          },
          onFail: (err) => {
            alert("error al crear cuenta" + err);
          }
        }
      );
    }
  }
  noVacia(texto: string) {
    return texto != null && texto.length > 0;
  }

}
