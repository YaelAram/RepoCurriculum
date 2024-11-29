# Laberinto

Este script permite generar laberintos circulares de forma aleatorio, permite al usuario indicar el número maximo de
niveles, número minimo y maximo de paredes y puertas por nivel.

Una vez creado el laberinto, el script obtiene un punto aleatorio dentro del laberinto y mediante el algoritmo de
Dijkstra verifica si hay un camino que nos lleve al centro del laberinto, si lo hay muestra el camino paso a paso,
caso contrario notifica al usuario que no existe un recorrido que conecte ambos puntos.

**Nota: Los muros se encargan de dividir un nivel en diferentes sencciones mientras que una puerta se encarga
de conectar una sección del nivel con el nivel interno.**

## Tecnologias utilizadas

- NodeJS 20.15.0
- NPM 10.8.1

## ¿Comó utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto

3. Modifica los parámetros del script (archivo app.js):

```
const config = createConfig(
  numero_maximo_niveles,
  numero_minimo_paredes,
  numero_maximo_paredes,
  numero_minimo_puertas,
  numero_maximo_puertas,
);
```

4. Ejecutar el script:

```
npm run start
```
