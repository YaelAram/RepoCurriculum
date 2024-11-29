# Proyecto de Sistemas Expertos (Frontend)

Este repositorio contiene la aplicacion frontend del proyecto, esta se encarga de consumir la API REST (proyecto backend)
y permitir al usuario interactuar con el sistema (crear nuevos registros de ventas, eliminar registros de ventas,
consutlar resgistros de ventas, utilizar el modelo de inferencia para sugerir una bebida, etc).

## Tecnologias utilizadas

- NodeJS 18.14.0 (Entorno de ejecución de JavaScript)
- YARN 1.22.19 (Manejador de paquetes de JavaScript)
- Vite 4.4.5 (Empaquetador de nuestra aplicacion)
- TypeScript 5.0.2 (Super set de JavaScript)

## ¿Comó utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto
3. Instalar las dependencias de Node

```
npm i
```

4. Iniciar el servidor de desarrollo:

```
npm run dev
```

5. Crear la _build_ de producción:

```
npm run build
```

## Paginas

### Pagina Sugerir

Esta pagina muestra al usuario la temperatura actual del lugar donde se encuentra, ingresar la edad del cliente y obtener
a partir de los dos datos anteriores dar una sugerencia de bebida al usuario.

A su vez tambien permite registrar una nueva venta, el cliente indica si desea o no segir la recomendacion enviada por el
sistema. Esta pagina da opcion al cliente de recalcular el modelo de inferencia que utiliza la aplicacion para crear
sugerencias de bebida al cliente y actualizar el reporte de temperatura.

### Pagina Historial de Ventas

Esta pagina muestra el historial de ventas de la aplicacion, muestra 8 registros por pagina, permite cambiar entre las
paginas de los registros de ventas (ir a la anterior pagina o a la siguiente pagina), el usuario puede eliminar los
registros de ventas.
