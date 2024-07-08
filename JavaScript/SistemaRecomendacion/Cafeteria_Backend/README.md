# Proyecto Sistemas Expertos (Backend)

Este repositorio contiene la aplicación backend del proyecto, esta se encarga de ofrecer un servicio de API REST,
esta se encarga de proporcionar servicios para la gestión de la base de datos MongoDB, dentro de la base de datos,
contamos con la colleción _**Sales**_ esta guarda toda la información relacionada con las ventas de la cafeteria.

## Tecnologias Utilizadas

- NodeJS 18.14.0 (Entorno de ejecución de JavaScript)
- YARN 1.22.19 (Manejador de paquetes de JavaScript)
- TypeScript 5.0.2 (Super set de JavaScript)
- CORS 2.8.5 (Da acceso a sitios externos para realizar peticiones a la API)
- DOTENV 16.3.1 (Permite leer variables de entorno localizadas en el archivo .env)
- EXPRESS 4.18.2 (Facilita la construcción de una API REST)
- MONGOOSE 7.4.5 (ORM que facilita la construcción de queries a la base de datos MongoDB)
- Visual Studio Code 1.82.2 (Editor de código utilizado)

## Contenido del archivo .env

Este archivo contiene las variables de entorno utilizadas por el servico, en ellas hay información sensible que no
se encuentra publicada en el repositorio de GitHub.

Variables de entorno:

- MongoDB_Atlas: Contiene la cadena de conexion que utiliza Mongoose para conectarse a la base de datos en la nube.
- Weather: Contiene el token de autenticación requerido por OpenWeather para ofrecer su servicio.

```
MongoDB_Atlas=<CADENA DE CONEXION A LA BASE DE DATOS>
Weather=<TOKEN DE AUTENTICACION PARA EL SERVICIO DE OPENWEATHER>
```

## Tipos de Dato

### Tipo de Dato Sale

Es el tipo de dato que guarda la colección _**Sales**_.

Contiene los siguientes atributos:

- uid: Es el ID unico generado por MongoDB.
- age: Es un número que representa la edad del cliente.
- temperature: Es un número que representa la temperatura ambiente del lugar.
- drink: Es un número entero (0 o 1) que representa el tipo de bebida comprada (0 para fría y 1 para caliente).

## Endpoints Colleción _Sales_

### Obtener Ventas (GET)

Permite paginar los registros de la colección _**Sales**_.

Argumentos (Query Parameters):

- limit: Establece el número de registros que la petición debe regresar.
- offset: Establece el número de registros a saltar o ignorar.

Respuesta (JSON):

- salesCount: Contiene el número de registros que contiene la colleción _**Sales**_.
- sales: Contiene un array con objetos tipo _Sale_

Ejemplo (limit = 5 y offset = 0):

```
{
  "salesCount": 2277,
  "sales": [
    {
      "age": 68,
      "temperature": 15,
      "drink": 1,
      "uid": "64ebd3242643034f552a063b"
    },
    {
      "age": 57,
      "temperature": 19,
      "drink": 1,
      "uid": "64ebd3242643034f552a0645"
    },
    {
      "age": 53,
      "temperature": 14,
      "drink": 1,
      "uid": "64ebd3242643034f552a0627"
    },
    {
      "age": 51,
      "temperature": 3,
      "drink": 1,
      "uid": "64ebd3242643034f552a0628"
    },
    {
      "age": 37,
      "temperature": 5,
      "drink": 1,
      "uid": "64ebd3242643034f552a062b"
    }
  ]
}
```

### Registrar una Venta (POST)

Permite crear un nuevo registro en la colección _**Sales**_.

Argumentos (Body en formato JSON):

- age: Es un número que representa la edad del cliente.
- temperature: Es un número que representa la temperatura ambiente del lugar.
- drink: Es un número entero (0 o 1) que representa el tipo de bebida comprada (0 para fría y 1 para caliente).

Respuesta:

- sale: Contiene el registro tipo _Sale_ creado.

Ejemplo de JSON enviado en el body:

```
{
  "age": 21,
  "temperature": 45,
  "drink": 0
}
```

Ejemplo de la respuesta:

```
{
  "sale": {
    "age": 21,
    "temperature": 45,
    "drink": 0,
    "uid": "650df167a05828f91d01ca5f"
  }
}
```

### Elimina una Venta (DELETE)

Permite eliminar un registro en la colección _**Sales**_.

Argumentos (URL params):

- id: El ID unico del registro de venta a eliminar.

Respuesta:

- sale: Contiene el registro tipo _Sale_ eliminado.

Ejemplo:

Se envia en la url el id "650df167a05828f91d01ca5f", se obtiene la siguiente respuesta:

```
{
  "sale": {
    "age": 21,
    "temperature": 45,
    "drink": 0,
    "uid": "650df167a05828f91d01ca5f"
  }
}
```

## Endpoint Modelo de Inferencia (POST)

Se encarga de crear el modelo de inferencia y guardarlo, posteriormente a la primera vez que se crea se puede indicar
si se desea reutilizar el modelo guardado (evitar recalcular el modelo cuando no es necesario) o volver a generarlo y
guardar ese nuevo modelo.

**Nota:** El modelo solo incluye los valores de probabilidad de la bebida fría, esto ahorra tiempo y
recursos al generar el modelo de inferencia, asi minimizar el tamaño de la respuesta enviada.

Argumentos (Body en formato JSON):

- newModel: Es un boolean que indica si se debe recalcular el modelo, de no ser enviado el valor por defecto es **false**.

Respuesta:

- sales: Indica el numero de registros utilizados al momento de crear el modelo de inferencia.
- createdAt: Es un numero que indica cuando fue creado el modelo (Date.prototype.getTime()).
- model: Es un objeto que contiene las probabilidades de la bebida fria para cada combinación de edad y temperatura.

Ejemplo:

```
{
  "sales": 2277,
  "createdAt": 1695413877579,
  "model": {
    "ChildFreezeCold": 0.23809524,
    "ChildColdCold": 0.40909091,
    "ChildCoolCold": 0.96969697,
    "ChildMildCold": 0.83333333,
    "ChildHotCold": 0.85714286,
    "ChildBoilingCold": 0.7875,
    "TeenFreezeCold": 0.2,
    "TeenColdCold": 0.44444444,
    "TeenCoolCold": 0.78125,
    "TeenMildCold": 0.9375,
    "TeenHotCold": 0.7375,
    "TeenBoilingCold": 0.8375,
    "YoungFreezeCold": 0.1375,
    "YoungColdCold": 0.24324324,
    "YoungCoolCold": 0.32258065,
    "YoungMildCold": 0.5,
    "YoungHotCold": 0.85714286,
    "YoungBoilingCold": 0.88888889,
    "MiddleFreezeCold": 0.3125,
    "MiddleColdCold": 0.25531915,
    "MiddleCoolCold": 0.39759036,
    "MiddleMildCold": 0.5,
    "MiddleHotCold": 0.33333333,
    "MiddleBoilingCold": 0.9,
    "AdultFreezeCold": 0.25,
    "AdultColdCold": 0.19565217,
    "AdultCoolCold": 0.31395349,
    "AdultMildCold": 0.5,
    "AdultHotCold": 0.91304348,
    "AdultBoilingCold": 0.7625,
    "RetiredFreezeCold": 0.0875,
    "RetiredColdCold": 0.1147541,
    "RetiredCoolCold": 0.13513514,
    "RetiredMildCold": 0.11111111,
    "RetiredHotCold": 0.5,
    "RetiredBoilingCold": 0.6,
    "OlderFreezeCold": 0.0375,
    "OlderColdCold": 0.16666667,
    "OlderCoolCold": 0.13793103,
    "OlderMildCold": 0.23076923,
    "OlderHotCold": 0.4375,
    "OlderBoilingCold": 0.6125
  }
}
```

## Endpoint Obtener Clima (POST)

Nos permite obtener la temperatura actual en grados centigrados y el nombre del lugar.

**Nota:** Este endpoint utiliza por debajo el servicio de OpenWeather.

Argumentos (Body en formato JSON):

- lat: Es un numero que indica la latitud.
- lon: Es un numero que indica la longitud.

Respuesta:

- temp: Temperatura actual del lugar.
- location: Nombre del lugar.

Ejemplo del JSON enviado en el body:

```
{
  "lat": 19.299964,
  "lon": -98.896313
}
```

Ejemplo de la respuesta:

```
{
  "temp": 26,
  "location": "Ixtapaluca"
}
```
