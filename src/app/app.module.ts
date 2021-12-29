import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElishCustomMaterialModule } from './elementos/custom.material';
import { LoginComponent } from './elementos/login/login.component';
import { RegistroComponent } from './elementos/login/registro.component';
import { ConfiguracionComponent } from './elementos/configuracion/configuracion.component';
import { AboutusComponent } from './elementos/aboutus.component';
import { aTarifaComponent } from './config/aTarifa.component';
import { CodCalificacionComponent } from './config/CodCalificacion.component';
import { CursosComponent } from './config/cursos.component';
import { EstudianteComponent } from './administracion/estudiante.component';
import { TarifaComponent } from './administracion/tarifa.component';
import { CalificacionComponent } from './administracion/calificacion.component';
//Firebase 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AsistenciaComponent } from './administracion/asistencia.component';
import { HeaderAdminComponent } from './elementos/cabecera/header.admin.component';
import { EmpleadoComponent } from './staff/empleado.component';
import { SalaryCodeComponent } from './staff/salarycode.component';
import { SalarioComponent } from './staff/salario.component';
import { TareaComponent } from './online/tarea.component';
import { TutorialesComponent } from './online/tutoriales.component';
import { ClasesComponent } from './online/clases.component';
import { TrabajosComponent } from './online/trabajos.component';
// subir archivos
import { FileUploadComponent } from './elementos/dropzone/fileupload.component';
import { DropZoneDirective } from './elementos/dropzone/dropzone.directive';
import { FileSizePipe } from './elementos/dropzone/filesize.pipe';
import { VerTrabajoComponent } from './online/verTrabajo.component';
import { VerClasesComponent } from './online/verClases.component';
import { VerTareaComponent } from './online/verTarea.component';
import { VerTutorialesComponent } from './online/verTutoriales.component';
import { MostrarEstudianteComponent } from './administracion/MostrarEstudiante.component';
import { VerTarifaComponent } from './administracion/verTarifa.component';
import { VerCalificacionesComponent } from './administracion/verCalificaciones.component';
import { NotificacionesComponent } from './elementos/configuracion/notificaciones.component';

import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';

import { RecursosHumanosComponent } from './pages/Recursos/recursos-humanos/recursos-humanos.component';
import { ServiciosInstitucionalesComponent } from './pages/servicios/servicios-institucionales/servicios-institucionales.component';
import { ServiciosAdministrativosComponent } from './pages/servicios/servicios-administrativos/servicios-administrativos.component';
import { ServiciosEducativosComponent } from './pages/servicios/servicios-educativos/servicios-educativos.component';
import { ServiciosExternosComponent } from './pages/servicios/servicios-externos/servicios-externos.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalPlataformaComponent } from './pages/Plataforma/principal-plataforma/principal-plataforma.component';
import { CabeceroComponent } from './pages/Elementos/cabecero/cabecero.component';
import { PiePaginaComponent } from './pages/Elementos/pie-pagina/pie-pagina.component';
import { ContactsComponent } from './pages/contacts/contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    AboutusComponent,
    aTarifaComponent,
    CodCalificacionComponent,
    EstudianteComponent,
    CursosComponent,
    TarifaComponent,
    CalificacionComponent,
    AsistenciaComponent,
    HeaderAdminComponent,
    EmpleadoComponent,
    SalaryCodeComponent,
    SalarioComponent,
    TareaComponent,
    TutorialesComponent,
    ClasesComponent,
    TrabajosComponent,
    FileUploadComponent,
    DropZoneDirective,
    ContactsComponent,
    RecursosInstalacionComponent,
    RecursosHumanosComponent,
    ServiciosInstitucionalesComponent,
    ServiciosAdministrativosComponent,
    ServiciosEducativosComponent,
    ServiciosExternosComponent,
    HomeComponent,
    PrincipalPlataformaComponent,
    CabeceroComponent,
    PiePaginaComponent,
FileSizePipe,
VerTrabajoComponent,
VerClasesComponent,
VerTareaComponent,
VerTutorialesComponent,
MostrarEstudianteComponent,
VerTarifaComponent,
VerCalificacionesComponent,
NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ElishCustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'Educacion'), 
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
