import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*
  Este archivo contiene el modulo principal de la aplicacion, se importa el componente AppComponent que es el 
  componente raiz de la aplicacion.
  Ademas se importa el modulo de ruteo que nos permite crear rutas en nuestra aplicacion, navegar a ellas y simular
  somo si la aplicacion constara de mas de un archivo HTML.
*/
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
