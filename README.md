# Repositorio Curriculum

Este repositorio contiene aquellos proyectos personales o escolares que considero son lo suficientemente complejos
o implican conceptos interesantes como para ser mostrados en mi página personal.

Hasta el momento este repositorio contiene los siguientes proyectos:

- Angular
  - Countries App: Una aplicación que permite al usuario buscar paises por nombre, capital o region (Continente), asi
    como ver a detalle información sobre el pais. En la sección de consulta muestra el nombre del pais, bandera,
    region, etc. Para más información consulta [Countries App](./Angular/CountriesApp/).
  - Horarios App: Esta aplicación genera de forma automatica horarios para los alumnos de la FES Aragón de la carrera
    de Ingenieria en Computación para el semestre 2025-1, la información utilizada por la aplicación fue recolectada
    de la API oficial de la institución. Para más información consulta [Horarios App](./Angular/HorariosApp/).
  - Maps App: Esta aplicación permite consultar mapas de forma similar a Google Maps gracias al servicio de Mapbox,
    realizar zoom, navegar por el mapa arrastrandolo y guardar ubicaciones. Utiliza el servicio de geolocalización del
    navegador para obtener la ubicación actual del usuario (ubicación inicial al iniciar la aplicación) y el servicio
    _reverse geolocation_ de Mapbox para obtener el nombre del lugar. Para más información
    consulta [Maps App](./Angular/MapsApp/).
- JavaScript
  - Laberinto: Es un _script_ que permite generar laberintos circulares aleatorios siguiendo las configuraciones iniciales
    del usuario. Ademas calcula si a partir de un punto aleatorio existe un camino que lo conecte con el centro del
    laberinto, para lo cual se utiliza el algoritmo de Dijkstra. Para más información consulta
    [Laberinto](./JavaScript/Laberinto/).
  - Sistema de Recomendación: Se trata de una aplicación (Backend y Frontend) que implementa un algoritmo Naive Bayes en
    un sistema de recomendación de bebidas. Se utiliza la ubicación actual del usuario y un servicio de clima para obtener
    la temperatura del lugar, asi como el parametro de edad del cliente como entradas para el sistema de recomendación.
    Para el frontend se implemento el patrón _Observable_ para gestionar la reactividad de la página asi como un servicio
    de _routing_ personalizado que convierte a nuestra página en una SPA. Para más información consulta
    [Sistema de recomendación](./JavaScript/SistemaRecomendacion/).
- NodeJS
  - Chat Bot: Se trata de una aplicación de consola que permite al usuario interactuar con un chat bot que lo guia por
    una tienda oline de libros, este bot le permite consultar su biblioteca persona (libros comprados) y buscar nuevos
    libros, ademas se incluye una conexión a Google Books para obtener una lista de libros a partir del termino
    buscado por el usuario (titulo, autor, etc). Para más información consulta [Chat Bot](./NodeJS/ChatBot/).
  - REST Server: Se trata de una API REST que permite realizar un CRUD a varias colecciones de objetos, ademas permite
    la subida de archivos y los almacena en el servicio de Cloudinary, la información es almacenada en Mongo Atlas y la
    información enviada por el usuario pasa por una fase de validación. Por último, la aplicación permite el registro
    de nuevos usuarios los cuales pueden utilizar la integración con el servicio de Google o rellenar un formulario
    con un email y contraseña, las contraseñas son procesadas por el algoritmo Bcrypt y para la gestión de sesiones el
    servidor es capaz de generar y validar JWT. Para más información consulta [REST Server](./NodeJS/REST_Server/).
  - Socket Queue: Esta aplicación contiene un servidor y dos páginas HTML, trata de simular el sistema de tickets de un
    banco, en donde una de las páginas permite generar nuevos tickets y hacer avanzar la fila mientras que la otra se
    encarga de mostrar el ticket actual. El servidor y las páginas se comunican mediante sockets. Para más
    información consulta [Socket Queue](./NodeJS/Socket_Queue/).
- React
  - Google Translator Clon: Se trata de un clon de Google Translator, este clon unicamente permite los idiomas Inglés,
    Español y Aleman. Para la traducción se utiliza el motor GPT-3.5-Turbo. Ademas se incluye una opción de idioma
    automatico que le indica al modelo que debe inferir el idioma del texto original. Para más información
    consulta [Google Translator](./React/Google_Translator/).
  - Store: Se trata de una tienda online, dentro del proyecto se puede observar el código fuente del servidor y de la
    tienda. Para el manejo de las peticiones HTTP se utilizo Tankstack Query. Para más información consulta
    [Store](./React/Store/).
- Arduino
  - Sistema de Control: Se trata de un sistema de control diseñado para restaurantes tipo parrilla Coreana donde tu mismo
    cocinas los alimentos. Este sistema se encarga de monitorear la temperatura, procentaje de luz, concentración de
    gas y la presencia de clientes en un comedor privado y comunicar el estado a un servidor en la nube que procesa los
    datos e indica al sistema si debe activar el aire acondicionado, el sistema de iluminación, el sistema de alerta
    de presencia de gas o el sistema de alerta de presencia de usuario (para indicar al personal que el comedor privado
    esta vacio y disponible para recibir nuevos clientes). Para más información consulta
    [Sistema de Control](./Arduino/sistema_control/).
