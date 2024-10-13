import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@schedule/components/layout/layout.component';

/*
  Esta variable contiene las rutas de nuestra aplicacion, cada objeto del arreglo tiene alguna de las siguientes 
  propiedades:
  - path: Representa la ruta que deseamos declarar.
  - component: Representa el componente a renderizar para esa ruta.
  - title: Contiene el titulo de la pagina (el texto que aparece en la pestaña del navegador).
  - children: Contiene otro arreglo de objetos de ruta.
  - loadComponent: Contiene una funcion que se encarga de cargar peresozamente las rutas de nuestra aplicacion, 
    es decir, la aplicacion unicamente carga aquellas rutas que el usuario visito por lo que el periodo de carga
    de la aplicacion es mas reducido.
  - redirectTo: Nos permite especificar al router de Angular que si el usuario entra a esa ruta debe ser 
    redireccionado a la ruta que recibe esta propiedad como valor.

  La ruta cuyo path es  "**", representa un comodin para el router de Angular, la aplicacion entra en esa ruta
  cada vez que el usuario entra a una ruta que no existe y nos permite realizar una accion.
*/
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', // Responde a la ruta /
        pathMatch: 'full',
        title: 'Horarios FES Aragon',
        loadComponent: () =>
          import('@pages/schedules-page/schedules-page.component'),
      },
      {
        path: 'materias', // Responde a la ruta /materias
        title: 'Materias Seleccionadas',
        loadComponent: () =>
          import(
            '@pages/selected-subjects-page/selected-subjects-page.component'
          ),
      },
      {
        path: 'horarios-creados', // Responde a la ruta /horarios-creados
        title: 'Horarios Generados',
        loadComponent: () =>
          import(
            '@pages/generated-schedules-page/generated-schedules-page.component'
          ),
      },
      {
        path: 'favoritos', // Responde a la ruta /favoritos
        title: 'Horarios Favoritos',
        loadComponent: () =>
          import(
            '@pages/favorite-schedules-page/favorite-schedules-page.component'
          ),
      },
      {
        path: '**', // Si entra a una ruta no definida
        redirectTo: '', // Lo redirigimos a la pagina con los horarios de clase
      },
    ],
  },
  {
    path: '**', // Si entra a una ruta no definida
    redirectTo: '', // Lo redirigimos a lso horarios de clase
  },
];

// Este modulo contiene la rutas de la aplicacion y se encarga de notificarlas al router de Angular
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
