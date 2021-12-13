import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './pages/contacts/contacts.component';
const routes: Routes =[
  {path: 'contacts', component: ContactsComponent}
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
