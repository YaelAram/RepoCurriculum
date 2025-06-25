# Repositorio Curriculum

Este repositorio contiene aquellos proyectos personales o escolares que considero son lo suficientemente complejos
o implican conceptos interesantes como para ser mostrados en mi página personal.

Hasta el momento este repositorio contiene los siguientes proyectos:

- Angular
  - **Countries App**: Una aplicación que permite al usuario buscar paises por nombre, capital o region (Continente), en
    cada página la aplicación muestra una tabla con información relevante sobre los paises que cumplan con
    el termino de búsqueda, por ejemplo, nombre del país, ciudad capital, bandera, moneda, idiomas y un link a Google
    Maps que muestra la ubicación del país. El campo de texto para la búsqueda por nombre o capital tiene implementado
    un sistema de debounce. La aplicación se desarrollo en Angular 19 con el soporte experimental para Zoneless y
    utilizando el nuevo sistema de reactividad basado en _signals_. Para más información
    consulta [Countries App](./Angular/CountriesApp/).
  - **Horarios App**: Esta aplicación genera de forma automatica horarios para los alumnos de la FES Aragón de la carrera
    de Ingenieria en Computación para el semestre 2025-1, la información utilizada por la aplicación fue recolectada
    de la API oficial de la institución. Para más información consulta [Horarios App](./Angular/HorariosApp/).
  - **Maps App**: Esta aplicación permite consultar mapas de forma similar a Google Maps gracias al servicio de Mapbox,
    realizar zoom, navegar por el mapa arrastrandolo y guardar ubicaciones. Utiliza el servicio de geolocalización del
    navegador para obtener la ubicación actual del usuario (ubicación inicial al iniciar la aplicación) y el servicio
    _reverse geolocation_ de Mapbox para obtener el nombre del lugar. Para más información
    consulta [Maps App](./Angular/MapsApp/).
  - **GitHubIssues**: Esta aplicación permite consultar las _issues_ relacionadas al repositorio de Angular, ademas el
    usuario puede filtrar dichas _issues_ según su estado (abierta o cerrada) y segun los _labels_ con los que fue
    etiquetada la _issue_. Si el usuario da click sobre el _issue_ puede acceder a la descripción y comentarios del mismo.
    Para el manejo de las peticiones HTTP se utilizó Tanstack Query. Para más información
    consulta [GitHub Issues](./Angular//GitHubIssues/).
  - **Pokemon SSR-SSG**: Muestra los primeros 400 pokemon de forma páginada (20 pokemon por página). Esta aplicación tiene
    soporte a SSR y se realiza el prerenderizado de las primeras 5 páginas y de las páginas que muestran los detalles
    sobre algunos pokemon. Se creo un _script_ que permite generar el archivo _routes.txt_ automáticamente según algunas
    configuraciones del usuario. Para más información consulta: [Pokemon SSR SSG](./Angular/Pokemon_SSR_SSG/).
  - **Shop App**: Se trata de una aplicación que permite gestionar los productos de una tienda online. Contiene rutas de
    de autenticación y creación de usuarios. Ademas de operaciones de creación, actualización y eliminación de productos.
    Ademas la aplicación cuenta con _guards_ de autenticación y autorización, previsualización y carga de archivos y un
    _guard_ creado para evitar que un usuario abandone la pagina de creación y edición de productos si no ha guardado su
    progreso. La aplicación utiliza Material UI para la construcción de la interfaz. Para más información
    consulta: [Shop App](./Angular/ShopApp/).
- JavaScript
  - **Sistema de Recomendación**: Se trata de una aplicación (Backend y Frontend) que implementa un algoritmo
    Naive Bayes en un sistema de recomendación de bebidas. Se utiliza la ubicación actual del usuario y un
    servicio de clima para obtener la temperatura del lugar, asi como el parametro de edad del cliente como
    entradas para el sistema de recomendación. Para el frontend se implemento el patrón _Observable_ para
    gestionar la reactividad de la página asi como un servicio de _routing_ personalizado que convierte a
    nuestra página en una SPA.
    Para más información consulta [Sistema de recomendación](./JavaScript/SistemaRecomendacion/).
- NodeJS
  - **Chat Bot**: Se trata de una aplicación de consola que permite al usuario interactuar con un chat bot que lo guia por
    una tienda oline de libros, este bot le permite consultar su biblioteca persona (libros comprados) y buscar nuevos
    libros, ademas se incluye una conexión a Google Books para obtener una lista de libros a partir del termino
    buscado por el usuario (titulo, autor, etc). Para más información consulta [Chat Bot](./NodeJS/ChatBot/).
  - **Cloud Functions**: Se trata de una _Netlify Function_ que se encarga de responder ante las solitudes creadas por un
    webhook de GitHub, el webhook esta configurado para notificar eventos relacionados con las estrellas e _issues_
    de un repositorio. Ademas, se conecta con un bot de Discord para notificar en un canal el evento que ocurrio
    dentro del repositorio. Para más información consulta [Cloud Functions](./NodeJS/CloudFunctions/).
  - **Auto Queue**: Esta aplicación contiene un servidor y tres páginas HTML, trata de simular el sistema de tickets de un
    banco, en donde una de las páginas permite generar nuevos tickets, otra se encarga de mostrar el ticket actual y
    la última permite a los cajeros tomar un nuevo ticket. El servidor y las páginas se comunican mediante sockets y
    peticiones a una API Rest. Para más información consulta [Socket Queue](./NodeJS/AutoQueue/).
  - **Auth Rest Server**: Se trata de una API Rest la cual se encarga de gestionar tres colecciones (Usuarios, productos
    y categorias) y almacenarlos de forma persistente en una base de datos MongoDB. Ademas el servidor tiene soporte
    para gestionar la carga de archivos, las contraseñas de los usuarios son procesadas por el algortimo Bcrypt y se
    gestiona la autenticación y autorización de usuarios mediante un sistema de roles y JWT. Para más información
    consulta [Auth Rest Server](./NodeJS/AuthRestServer/).
- React
  - **Google Translator Clon**: Se trata de un clon de Google Translator, este clon unicamente permite los idiomas Inglés,
    Español y Aleman. Para la traducción se utiliza el motor GPT-3.5-Turbo. Ademas se incluye una opción de idioma
    automatico que le indica al modelo que debe inferir el idioma del texto original. Para más información
    consulta [Google Translator](./React/Google_Translator/).
- Arduino
  - **Sistema de Control**: Se trata de un sistema de control diseñado para restaurantes tipo parrilla Coreana donde tu mismo
    cocinas los alimentos. Este sistema se encarga de monitorear la temperatura, procentaje de luz, concentración de
    gas y la presencia de clientes en un comedor privado y comunicar el estado a un servidor en la nube que procesa los
    datos e indica al sistema si debe activar el aire acondicionado, el sistema de iluminación, el sistema de alerta
    de presencia de gas o el sistema de alerta de presencia de usuario (para indicar al personal que el comedor privado
    esta vacio y disponible para recibir nuevos clientes). Para más información consulta
    [Sistema de Control](./Arduino/sistema_control/).
- ASP.NET Core
  - **StockMarketApi**: Se trata de una API basada en controladores, permite la gestion de una colección de _Stocks_ y
    otra colección con los comentarios relacionados a los _Stocks_ esta información es guardada en una base de datos
    PostgreSQL y se utiliza el ORM Entity Framework Core. Además la aplicación incorpora un sistema de autenticación y
    autorización basada en Identity y JwtBearer, se implemento un sistema de refresco de _tokens_ que requiere un
    _refresh token_ vigente. Los endpoints de la aplicación poseen politicas de _rate limit_ y _cors_. La información
    de configuración (no sensible) es guardada en el archivo _appsettings.json_ el resto es guardada utilizando
    el _secret manager_.
    Para más información consulta [StockMarketApi](./ASP.NET%20Core/StockApp/)
