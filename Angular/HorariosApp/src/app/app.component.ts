import { Component } from '@angular/core';

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.
*/

// El componente de entrada en este caso no requiere implementar ningun tipo de logica.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
