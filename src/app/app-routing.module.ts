import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './elementos/configuracion/configuracion.component';
import { LoginComponent } from './elementos/login/login.component';
import { RegistroComponent } from './elementos/login/registro.component';
import { AuthGuardService } from './servicios/auth-guard.service';
import { NavAuthGuardService } from './servicios/nav-auth-guard.service';
import { EstudianteComponent } from './administracion/estudiante.component';
import { MostrarEstudianteComponent } from './administracion/MostrarEstudiante.component';
import { TarifaComponent } from './administracion/tarifa.component';
import { VerTarifaComponent } from './administracion/verTarifa.component';
import { CalificacionComponent } from './administracion/calificacion.component';
import { VerCalificacionesComponent } from './administracion/verCalificaciones.component';
import { aTarifaComponent } from './config/aTarifa.component';
import { CodCalificacionComponent} from './config/CodCalificacion.component';
import { CursosComponent } from './config/cursos.component';
import { EmpleadoComponent } from './staff/empleado.component';
import { SalarioComponent } from './staff/salario.component';
import { SalaryCodeComponent } from './staff/salarycode.component';
import { TrabajosComponent } from './online/trabajos.component';
import { VerTrabajoComponent } from './online/verTrabajo.component';
import { TareaComponent } from './online/tarea.component';
import { VerTareaComponent } from './online/verTarea.component';
import { TutorialesComponent } from './online/tutoriales.component';
import { VerTutorialesComponent } from './online/verTutoriales.component';
import { ClasesComponent } from './online/clases.component';
import { VerClasesComponent } from './online/verClases.component';
import { NotificacionesComponent } from './elementos/configuracion/notificaciones.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosInstitucionalesComponent } from './pages/servicios/servicios-institucionales/servicios-institucionales.component';
import { ServiciosEducativosComponent } from './pages/servicios/servicios-educativos/servicios-educativos.component';
import { PrincipalPlataformaComponent } from './pages/Plataforma/principal-plataforma/principal-plataforma.component';
import { ServiciosAdministrativosComponent } from './pages/servicios/servicios-administrativos/servicios-administrativos.component';
import { ServiciosExternosComponent } from './pages/servicios/servicios-externos/servicios-externos.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: 'estudiante', component: EstudianteComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'MostrarEstudiante', component: MostrarEstudianteComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'aTarifa', component: aTarifaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'tarifa', component: TarifaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verTarifa', component: VerTarifaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'tarifa/:id', component: TarifaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'calificacion', component: CalificacionComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verCalificaciones', component: VerCalificacionesComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'calificacion/:id', component: CalificacionComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'CodCalificacion', component: CodCalificacionComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'empleado', component: EmpleadoComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'trabajos', component: TrabajosComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verTrabajo', component: VerTrabajoComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'tarea', component: TareaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verTarea', component: VerTareaComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'tutoriales', component: TutorialesComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verTutoriales', component: VerTutorialesComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'clases', component: ClasesComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'verClases', component: VerClasesComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'salarycode', component: SalaryCodeComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'salario/:id', component: SalarioComponent, canActivate: [AuthGuardService, NavAuthGuardService] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuardService] },
  { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuardService] },
  { path: 'servicios-institucionales',component: ServiciosInstitucionalesComponent},
  { path: 'servicios-educativos',component: ServiciosEducativosComponent},
  { path: 'servicios-administrativos',component: ServiciosAdministrativosComponent},
  { path: 'servicios-externos',component: ServiciosExternosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'principal-plataforma', component: PrincipalPlataformaComponent},
  { path: 'RecursosInstalacion', component: RecursosInstalacionComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
