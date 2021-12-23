import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule, Settings} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'flash-messages-angular';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './pages/login/login.component';
<<<<<<< HEAD
import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';
=======
import { RecursosHumanosComponent } from './pages/Recursos/recursos-humanos/recursos-humanos.component';
import { ServiciosInstitucionalesComponent } from './pages/servicios/servicios-institucionales/servicios-institucionales.component';
import { ServiciosAdministrativosComponent } from './pages/servicios/servicios-administrativos/servicios-administrativos.component';
import { ServiciosEducativosComponent } from './pages/servicios/servicios-educativos/servicios-educativos.component';
import { ServiciosExternosComponent } from './pages/servicios/servicios-externos/servicios-externos.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalPlataformaComponent } from './pages/Plataforma/principal-plataforma/principal-plataforma.component';
import { CabeceroComponent } from './pages/Elementos/cabecero/cabecero.component';
import { PiePaginaComponent } from './pages/Elementos/pie-pagina/pie-pagina.component';
import { UsuariosComponent } from './pages/Plataforma/usuarios/usuarios.component';
import { UsuarioServicio } from './services/usuario.service';
import { CursoComponent } from './pages/Plataforma/curso/curso.component';
>>>>>>> 43606f65637d564016a231dc204ef0d7789de381



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    LoginComponent,
<<<<<<< HEAD
    RecursosInstalacionComponent
=======
    RecursosHumanosComponent,
    ServiciosInstitucionalesComponent,
    ServiciosAdministrativosComponent,
    ServiciosEducativosComponent,
    ServiciosExternosComponent,
    HomeComponent,
    PrincipalPlataformaComponent,
    CabeceroComponent,
    PiePaginaComponent,
    UsuariosComponent,
    CursoComponent
>>>>>>> 43606f65637d564016a231dc204ef0d7789de381
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore,'Educacion'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [UsuarioServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
