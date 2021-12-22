import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiciosInstitucionalesComponent } from './pages/servicios/servicios-institucionales/servicios-institucionales.component';
import { ServiciosEducativosComponent } from './pages/servicios/servicios-educativos/servicios-educativos.component';
import { PrincipalPlataformaComponent } from './pages/Plataforma/principal-plataforma/principal-plataforma.component';
import { UsuariosComponent} from './pages/Plataforma/usuarios/usuarios.component';

const routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'servicios-institucionales',component: ServiciosInstitucionalesComponent},
  {path: 'servicios-educativos',component: ServiciosEducativosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'principal-plataforma', component: PrincipalPlataformaComponent},
  {path: 'usuarios', component: UsuariosComponent}
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
