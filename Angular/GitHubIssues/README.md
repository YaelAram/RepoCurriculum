# GitHub Issues

Esta aplicación se encarga de mostrar al usuario los _issues_ relacionados al repositorio oficial de Angular en
GitHub y permitirle filtrarlos según su estado (Abierto o Cerrado) y los _labels_ asociados al _issue_. Ademas el 
usuario puede dar click sobre las _issues_ y acceder a una página con los detalles del _issue_ y la sección de 
comentarios.

Los comentarios de los _issues_ utilizan un componente que soporta _Markdown_ y con el fin de facilitar la realización
de peticiones HTTP se utilizó la librería _Tankstack Query_.

## Tecnologias Utilizadas

- Angular 18.2.0
- NodeJS 20.15.0
- NPM 11.0.0
- ngx-markdown 18.1.0
- Tanstack Query (Angular) 5.62.9
- Tailwind 3.4.17

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
