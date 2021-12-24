import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './pages/contacts/contacts.component';


import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';


import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiciosInstitucionalesComponent } from './pages/servicios/servicios-institucionales/servicios-institucionales.component';
import { ServiciosEducativosComponent } from './pages/servicios/servicios-educativos/servicios-educativos.component';
import { PrincipalPlataformaComponent } from './pages/Plataforma/principal-plataforma/principal-plataforma.component';
import { ServiciosAdministrativosComponent } from './pages/servicios/servicios-administrativos/servicios-administrativos.component';
import { ServiciosExternosComponent } from './pages/servicios/servicios-externos/servicios-externos.component';
import { UsuariosComponent} from './pages/Plataforma/usuarios/usuarios.component';
import { PerfilComponent} from './pages/Plataforma/perfil/perfil.component';
import { CursoComponent} from './pages/Plataforma/curso/curso.component';
import { CalificacionesComponent} from './pages/Plataforma/calificaciones/calificaciones.component';
import { CrearUsuarioComponent} from './pages/Plataforma/crear-usuario/crear-usuario.component';

const routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'servicios-institucionales',component: ServiciosInstitucionalesComponent},
  {path: 'servicios-educativos',component: ServiciosEducativosComponent},
  {path: 'servicios-administrativos',component: ServiciosAdministrativosComponent},
  {path: 'servicios-externos',component: ServiciosExternosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'principal-plataforma', component: PrincipalPlataformaComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'curso', component: CursoComponent},
  {path: 'calificaciones', component: CalificacionesComponent},
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path: 'RecursosInstalacion', component: RecursosInstalacionComponent}

  //{path: '**', pathMatch: 'full', redirectTo: 'contacts'}
  //{path: 'contacts/:id', component: ContactsComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
