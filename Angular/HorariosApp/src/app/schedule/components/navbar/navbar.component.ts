import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/*
  Esta interfaz describe los elementos del menu superior de navegacion donde:
  - title: Contiene el texto legible por el usuario que le indica a donde apunta
  - url: Contiene la url a la que apunta el elemento.
*/
interface NavItem {
  title: string;
  url: string;
}

/*
  Un componente de Angular consta de los sigueintes archivos:
  - Un archivo TypeScript: Que contiene la logica del componente.
  - Un archivo HTML: Que contiene la estructura HTML del componente y muestra al usuario la informacion
    generada por la logica del componente.
  - Un archivo CSS (Opcional): Contienen los estilos CSS del componente, estos estilos unicamente modifican los 
    elementos HTML del componente.

  Este componente se encarga de construir el menu superior de navegacion de la aplicacion.
*/
@Component({
  selector: 'schedule-navbar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // Creamos una propiedad publica con la lista de elementos que va a contener nuestro menu de navegacion
  public items: NavItem[] = [
    { title: 'Horarios', url: '' },
    { title: 'Materias', url: '/materias' },
    { title: 'Favoritos', url: '/favoritos' },
  ];
}
