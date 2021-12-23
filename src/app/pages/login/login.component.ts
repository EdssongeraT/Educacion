import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firebasetsAuth: FirebaseTSAuth;

  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  onLogin(loginCorreo: HTMLInputElement, loginContrasena: HTMLInputElement) {
    let correo = loginCorreo.value;
    let contrasena = loginContrasena.value;
    if (this.noVacia(correo) && this.noVacia(contrasena)) {
      this.firebasetsAuth.signInWith(
        {
          email: correo,
          password: contrasena,
          onComplete: (uc) => {
            
            loginCorreo.value = "",
              loginContrasena.value = "";
          },
          onFail: (err) => {
            alert("error al acceder a cuenta" + err);
          }
        }
      );
    }
  }
  ngOnInit(): void {
  }
  noVacia(texto: string) {
    return texto != null && texto.length > 0;
  }
}
