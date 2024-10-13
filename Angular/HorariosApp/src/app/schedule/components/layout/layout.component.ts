import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.
  
  Este componente no contiene ninguna logica, su unico proposito es servir de layout para las distintas paginas 
  de la aplicacion, en otras palabras, contiene los elementos de la interfaz de usuario que son comunes en todas
  las rutas. En este caso el unico elemento comun es el menu de navegacion.
*/
@Component({
  selector: 'schedule-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
