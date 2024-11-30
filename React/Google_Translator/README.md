# Google Trnaslator Clon

Esta aplicación intenta simular la interfaz de usuario de Google Traductor, este clon unicamente tiene disponibles
los idiomas Inglés, Español y Aleman.

Para el funcionamiento de nuestro traductor se utilizo el modelo GPT 3.5 Turbo ofrecido por OpenAI, el cual fue
entrenado para recibir un _string_ que contiene el texto original, le indica el idioma en el que esta y el idioma
al que deseamos traducir el texto.

Adicionalmente se agrego la opción de idioma Automatico, la cual le indica al modelo que debe de detectar el idioma
origen pro si solo.

## Tecnologias Utilizadas

- NodeJS 18
- Bootstrap 5.3.1
- ReactJS 18.2.0
- React DOM 18.2.0
- OpenAI 3.3.0
- TypeScript 5.0.2
- Yarn 1.22.21

## ¿Comó utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto
3. Instalar las dependencias de Node

```
yarn
```

4. Reconstruir el archivo .env con el api key generado por la plataforma de OpenAI

```
VITE_OPENAI_KEY=""
```

5. Iniciar el servidor de pruebas

```
yarn dev
```

6. Generar la _build_ de producción

```
yarn build
```
