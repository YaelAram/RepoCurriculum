# Shop App

Se trata de un panel de administración para un tienda online. La aplicación esta construida con base a Angular Material,
_signals_ y _standalone components_.

La aplicación cuenta con las siguientes rutas:
  - Acceso publico: LogIn, SignUp, catalogo de productos y página de detalles del producto.
  - Acceso restringido: Panel administrativo de productos (creación, edición y eliminación).

Se implemento un _CanDeactivate guard_ en la página de creación y edición de productos el cual notifica al usuario 
cada vez que intenta abandonar la página, si y solo si, el formulario reactivo ha sido marcado como _dirty_, es decir,
ha sido modificado por el usuario y dichos cambios se perderan si no se guarda el producto.

Ademas la página permite al usuario seleccionar imagenes desde su dispositivo para subirlas a la página, eliminar imagenes
y muestra una vista previa de la imagenes subidas.

## Tecnologias Utilizadas

- Angular 19.1.5
- RxJS 7.8.0
- TypeScript 5.7.2
- NodeJS 22.11.0
- NPM 11.4.1
- Material UI 19.1.0

## ¿Como utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto

3. Instalar las dependencias de Node

```
npm i
```

4. Instalar el Angular CLI

```
npm install -g @angular/cli
```

5. Verificar que el Angular CLI este instalado correctamente

```
ng version
```

6. Ejecutar el servidor de prueba

```
ng serve
```

7. Contruir la version de produccion del proyecto

```
ng build
```
