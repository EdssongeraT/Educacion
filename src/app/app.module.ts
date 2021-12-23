import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { appendFile } from 'fs';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './pages/login/login.component';
import { RecursosInstalacionComponent } from './pages/recursos-instalacion/recursos-instalacion.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    LoginComponent,
    RecursosInstalacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
