# Proyecto Chat Bot

Este proyecto presenta un chat bot creado a partir de un grafo. Este chat bot utiliza la API publica de Google
Books para obtener la información de los libros consultados por el usuario como el titulo del libro, nombre del autor,
el precio por el que es vendido dentro de la tienda de Google, etc. Además el usuario puede agregar dichos archivos a
un carrito de compras y simular su compra, dicha información de compra se registra dentro de una base de datos en
MongoDB.

## Requerimientos Previos

### Creación del archivo .env

Crear archivo con variables de entorno (.env), con la siguiente estructura:

En la variable MongoDB_Atlas deberás pegar el URL de conexión generado por MongoDB Atlas al crear una nueva base de
datos, además del usuario y contraseña creado en el mismo sitio

Las demás variables corresponden a los emotes que utiliza el sistema para crear los mensajes de chat, estos pueden ser
modificados sin afectar el funcionamiento de la aplicación.

```
MongoDB_Atlas=LINK_CONEXION_MONGODB
robot=( • ͜ʖ • )
robot_error=¯\_( • ͜ʖ • )_/¯
robot_question=( ͠• ͜ʖ ͡•)
robot_sad=( ͡❛ ︹ ͡❛)
user=( ͡❛ ‿ ͡❛)
```

### Reconstruir los node_modules

Ejecutar el siguiente comando:

```
npm install
```

### Ejecutar la aplicación

Ejecuta el siguiente comando:

```
node app
```

## Funcionamiento

El sistema funciona mediante el reconocimiento de algunas palabras o comandos clave disparan la ejecución de una
función, los datos mostrados son recuperados de la API de Google Books, solo se muestran los primeros 4 resultados.

## Lista de Comandos

- BUSCAR: Permite realizar una consulta a partir del título ingresado por el usuario
- COMPRAR: Permite realizar la búsqueda y agregar productos a la cesta de compras
- CARRITO: Permite visualizar y eliminar los elementos que están en la cesta de compras
- TERMINAR COMPRA: Permite dar un último vistazo a la cesta de compras, simula la compra de los productos,
  imprime un recibo de compra y añade los artículos a la biblioteca.
- LIBRERIA: Permite acceder a la librería, donde se encuentran todos los artículos adquiridos y se puede
  seleccionar uno para comenzar a leer
- AYUDA: Da un breve resumen sobre la función de cada comando y un ejemplo de cómo usarlos
- SALIR: Finaliza la ejecución de la aplicación

## Guía Básica del Uso de Comandos

En el flujo normal de funcionamiento de la aplicación, al inicio de esta o luego de haber ejecutado algún comando, esta
regresara al siguiente estado:

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛):
```

Aquí en donde escribiremos cada uno de los comandos que deseamos ejecutar.

**NOTA: La ejecución de comandos puede no seguir un orden establecido, es decir, el recorrido por la aplicación puede
ser aleatorio y no requiere de seguir un camino estricto para llegar a un punto**

Por ejemplo: Un usuario podría seguir el siguiente recorrido dentro de la aplicación para realizar una compra:

1. Comando COMPRAR
2. Comando BUSCAR
3. Comando COMPRAR
4. Comando CARRITO
5. Comando LIBRERIA
6. Comando AYUDA
7. Comando TERMINAR COMPRA

**NOTA: Los comandos no son sensibles a mayúsculas o minúsculas**

**NOTA: Para navegar por los menú puede realizarse mediante el uso de las teclas de dirección o escribiendo el número de
la opción que deseamos, si deseas seleccionar esa opción teclea ENTER**

### Comando BUSCAR COMPRAR

**NOTA: El funcionamiento de ambos comandos es similar, con la única diferencia en que COMPRAR añade los libros
seleccionados en la cesta de compras**

Permite realizar una consulta a partir del título ingresado por el usuario.

Este comando puede funcionar de dos formas distintas:

- Con Parámetros
- Sin Parámetros

#### Funcionamiento con Parámetros

Ingresamos en el cuadro de texto la palabra clave BUSCAR seguido de los títulos de libros que deseamos consultar.

**NOTA: Si son más de un título, el título de cada libro debe estar separado por una coma ( , )**

Ejemplo: Busquemos los siguientes libros:

- Las Dos Torres
- El retorno del rey

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): buscar las dos torres, el retorno del rey
```

Al dar ENTER, nos creara un menú con los primeros 4 resultados encontrados, da enter en cualquiera de los
resultados para continuar, seleccionemos el primer resultado (ENTER para seleccionar):

El sistema muestra el titulo y autor de cada libro.

```
? ( • ͜ʖ • ): Encontre los siguientes libros: (Use arrow keys)
> 1. El Señor de Los Anillos, Ii ( J. R. R. Tolkien )
  2. El Señor de los anillos ( J. R. R. Tolkien )
  3. El señor de los anillos: Las dos torres ( John Ronald Reuel Tolkien )
  4. El Senor de los Anillos ( J. R. R. Tolkien )
```

Al dar ENTER ahora genera un nuevo menú con los resultados para el segundo libro:

```
? ( • ͜ʖ • ): Encontre los siguientes libros: 1. El Señor de Los Anillos, Ii ( J. R. R. Tolkien )
? ( • ͜ʖ • ): Encontre los siguientes libros: (Use arrow keys)
> 1. El Senor de los Anillos: El Retorno del Rey = The Lord of the Rings ( J. R. R. Tolkien )
  2. El retorno del rey ( J. R. R. Tolkien )
  3. El retorno del rey ( John Ronald Reuel Tolkien )
  4. El señor de los anillos: El retorno del rey ( John Ronald Reuel Tolkien )
```

Una vez finaliza con la búsqueda de los libros, vuelve a preguntar por una nueva acción a realizar.

#### Funcionamiento sin Parámetros

El funcionamiento de este comando son parámetros es similar al funcionamiento con parámetros.

Realicemos la búsqueda de los mismo libros que, en la sección anterior, en este caso únicamente ingresaremos la
palabra clave COMPRAR.

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): comprar
```

Una vez damos ENTER, el sistema nos preguntara que libros deseamos buscar, al igual que en la busqueda con parametros
en caso de ser mas de dos libros separamos el titulo de cada uno por una coma ( , ).

**NOTA: En este punto no es necesario agregar la palabra clave BUSCAR, solo los titulos de los libros**

```
? ( ͠• ͜ʖ ͡•): ¿Que libros deseas buscar?
? ( ͡❛ ‿ ͡❛): las dos torres, el retorno del rey
```

A partir de este punto el funcionamiento de BUSCAR con o sin parametros es el mismo, creara los menus de seleccion y
una vez termine con todas las consultas regresa a preguntar por una nueva accion.

### Comando CARRITO

Permite visualizar y eliminar los elementos que estan en la cesta de compras.

Si el sistema detecta que aun no hay productos en la cesta muestra el siguiente mensaje:

```
? ( ͡❛ ‿ ͡❛): carrito
? ( • ͜ʖ • ): Sin productos en la cesta
```

De lo contrario muestra lo siguiente (supon que con el comando COMPRAR agregamos el libros de el Señor de los anillos:
Las Dos Torres y el Señor de los anillos: El Retorno del Rey):

```
? ( ͡❛ ‿ ͡❛): carrito
? ( • ͜ʖ • ): Selecciona aquellos items que deseas remover: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
>( ) 1. El Señor de Los Anillos, Ii ( J. R. R. Tolkien )
 ( ) 2. El Senor de los Anillos: El Retorno del Rey = The Lord of the Rings ( J. R. R. Tolkien )
```

Este menu a diferencia de los demas funciona como un CheckBox, los libros cuyas casillas sean seleccionadas seran
eliminados de la cesta de compras, para seleccionar basta con teclear ESPACIO y para confirmar la lista ENTER.

### Comando TERMINAR COMPRA

Permite dar un ultimo vistazo a la cesta de compras, simula la compra de los productos, imprime un recibo de compra y
añade los articulos a la biblioteca.

Una vez el sistema reconoce este comando, pregunta al usuario si desea dar un ultimo vistazo a la cesta de compras:

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): terminar compra
? ( ͠• ͜ʖ ͡•): ¿Deseas ver tu carrito de compras antes de realizar la compra? (y/N)
```

Si escribimos una "y" mostrara la cesta de compras tal y como lo hace el comando CARRITO ademas de permitirnos
eliminar productos de este.

Si escribimos "N" o luego de visualizar el carrito de compras muestra lo siguiente:

```
? ( • ͜ʖ • ): Aqui puedes encontrar el ticket de compra, disfruta de los libros

1. El Señor de Los Anillos, Ii ( J. R. R. Tolkien )                                                  -> $100.00

2. El Senor de los Anillos: El Retorno del Rey = The Lord of the Rings ( J. R. R. Tolkien )          -> $100.00
________________________________________________________________________________________________________________________
Total                                                                                                -> $200.00

? ( • ͜ʖ • ): Agregando a tu biblioteca...
? ( • ͜ʖ • ): Los libros se han agregado con exito
```

Los libros que han sido comprados seran guardados en la base de datos (MongoDB) por lo que se puede acceder a ellos luego
cerrar la aplicacion.

### Comando LIBRERIA

Permite acceder a la libreria, donde se encuentran todos los articulos adquiridos y se puede seleccionar uno para
comenzar a leer.

La aplicacion crea un menu con todos los libros que han sido comprados, al seleccionar uno se muestra en pantalla
su contenido.

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): libreria
? ( • ͜ʖ • ): Abriendo biblioteca...
? ( • ͜ʖ • ): Libreria: (Use arrow keys)
> 1. Harry Potter y las reliquias de la muerte ( Autor Deconocido )
  2. El Señor de los anillos ( J. R. R. Tolkien )
  3. Harry Potter y el cáliz de fuego ( J. K. Rowling )
  4. El Señor de Los Anillos, Ii ( J. R. R. Tolkien )
```

Si seleccionamos el tercer libro (Harry Potter y el cáliz de fuego), encontraremos lo siguiente:

```
Harry Potter y el cáliz de fuego

Tras otro abominable verano con los Dursley, Harry se dispone a iniciar el cuarto curso en Hogwarts, la famosa escuela de magia y hechicería. A sus catorce años, a Harry le gustaría ser un joven mago como los demás y dedicarse a aprender nuevos sortilegios, encontrarse con sus amigos Ron y Hermione y asistir con ellos a los Mundiales de quidditch. Sin embargo, al llegar al colegio le espera una gran sorpresa que lo obligará a enfrentarse a los desafíos más temibles de toda su vida. Si logra superarlos, habrá demostrado que ya no es un niño y que está preparado para vivir las nuevas y emocionantes experiencias que el futuro le depara.
```

**NOTA: Ya que no se cuentan con los derechos de autor al seleccionar un libro se imprime la descripcion del libro
que la API de Goggle Books ofrece, en caso de que la API no regrese una descripcion solo aparece la frase de "Sin
descripcion"**

### Comando AYUDA

Da un breve resumen sobre la funcion de cada comando y un ejemplo de como usarlos.

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): ayuda
? ( • ͜ʖ • ): Aqui hay algo que puede ayudarte:
+ Los comandos NO son sensibles a las mayusculas y minusculas
+ El comando BUSCAR permite consultar la informacion de los libros que desees
  * Si solo escribes BUSCAR, el sistema te preguntara posteriormente que libros buscar
  * Tambien puedes escribir los titulos junto al comando, sepando cada uno con una coma, puedes poner tantos como quieras
      - EJEMPLO ( 1 libro ): buscar el retorno del rey
      - EJEMPLO ( 2 lirbos ): buscar el caliz de fuego, la orden del fenix
+ El comando COMPRAR permite consultar la informacion de los libros que desees comprar y los añade a la cesta
  * Si solo escribes COMPRAR, el sistema te preguntara posteriormente que libros buscar y comprar
  * Tambien puedes escribir los titulos junto al comando, sepando cada uno con una coma, puedes poner tantos como quieras
      - EJEMPLO ( 1 libro ): comprar el retorno del rey
      - EJEMPLO ( 2 lirbos ): comprar el caliz de fuego, la orden del fenix
+ El comando CARRITO permite consultar los libros que han sido añadidos a la cesta por el comando COMPRAR
+ El comando TERMINAR COMPRA permite generar un ticket de compra y agregar los libros de la cesta a la biblioteca personal
+ El comando LIBRERIA permite abrir la libreria personal, ahi podremos seleccionar un libro y comenzar a leer
```

### Comando SALIR

Finaliza la ejecucion de la aplicacion, en esta se pierden los libros guardados en la cesta pero no los que se encuentran
en la libreria.

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): salir
? ( ͡❛ ︹ ͡❛): Adios, vuelve pronto
```

### Comando No Reconocido

Si el usuario ingresa un comando que no es reconocido por el sistema, este muestra el siguiente mensaje y vuelve a
preguntar por una nueva accion:

```
? ( ͠• ͜ʖ ͡•): ¿En que puedo ayudarte?
? ( ͡❛ ‿ ͡❛): asdasdasd
? ¯\_( • ͜ʖ • )_/¯: Uppps!
- Perdona no pude entenderte, no reconozco el comando asdasdasd
- Puedes escribir salir para salir
- Puedes escribir ayuda para obtener la descripcion de los comandos
- Los comandos NO son sensibles a las mayusculas o minusculas
```
