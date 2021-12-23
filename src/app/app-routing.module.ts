import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './pages/contacts/contacts.component';

import { LoginComponent } from './pages/login/login.component';

import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';
const routes: Routes =[
  {path: 'contacts', component: ContactsComponent},
  {path: 'Login', component: LoginComponent},
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
