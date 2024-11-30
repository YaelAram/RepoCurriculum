# Sistema de Recomendación

En esta sección del repositorio se encuentra el código fuente sel servidor y página web de un sistema de recomendación
el cual utiliza el algoritmo Naive Bayes para crear las recomendaciones. Este sistema recibe como entradas dos datos,
la temperatura ambiente del lugar y la edad del usuario, devuelve como resultado la recomendación de bebida (una
bebida fria o una caliente).

## Front End

La página web de la aplicación se realizo utilizando TypeScript, es decir, no se utilizo ningun framework o libreria
como Angular, React o Vue. En su lugar se implemento un sistema de _routing_ personalizado que permite obtener el mismo
resultado que en una SPA.

Para el manejo de la reactividad de la página se utilizo el patrón de diseño _Observable_ mientras que para la generación
de páginas y componentes se utilizaron Web Components.

Por último, se utilizo la API de geolocalización del navegador para obtener la ubicación actual del usuario y la API de
Open Weather para obtener el reporte del clima en esa ubicación.

## Back End

El backend se encarga de contener el motor de inferencia (el algoritmo Naive Bayes), los registros utilizados por el
sistema son almacenado en una base de datos alojada en Mongo Atlas. Ademas de permitir a la página web obtener el reporte
del clima segun la ubicación del cliente y permitir registrar nuevas compras que sirven para alimentar al sistema de
recomendación.
