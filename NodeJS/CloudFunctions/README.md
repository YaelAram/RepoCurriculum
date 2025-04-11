# Proyecto Cloud Functions

El siguiente repositorio contiene el código fuente utilizado para crear Netlify Functions las cuales reaccionan
ante una petición generada por el WebHook configurado en un repositorio de GitHub y despliegan un mensaje en un
canal de Discord.

**Nota: El webhook de GitHub únicamente notifica cuando el repositorio recibe o pierde una estrella o ante cualquier
cambio en las _issues_ del repositorio.**

**Nota: Con el fin de evitar procesar peticiones no autorizadas la _Netlify Function_ verifica la firma alojada
en uno de los _headers_ de la petición.**

## Estructura del proyecto

Con el fin de evitar situar toda nuestra lógica del negocio dentro del archivo que aloja nuestra _Netlify Function_
separamos el proyecto, donde:

- La carpeta src posee todo el código encargado de validar la firma de la petición, procesar el evento de GitHub, etc.
- La carpeta netlify contiene el código fuente de la _Netlify Function_, esta solo se encarga de orquestar los métodos y
  funciones definidos dentro de la carpera src.

## Tecnologias Utilizadas

- NodeJS 22.11.0
- NPM 11.1.0
- @netlify/functions 3.0.2

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

4. Reconstruir el archivo .env (Obtener la URL del bot de Discord y crear un nuevo secret para la firma y
   verificación de las peticiones de GitHub).

```
DISCORD_BOT_URL=""
GITHUB_WEBHOOK_SECRET=""
```

5. Instalar el CLI de Netlify e iniciar sesión:

```
npm install netlify-cli -g
netlify login
```

6. Iniciar el modo de desarrollo para probar nuestras funciones:

```
// Comando package.json
"netlify:dev": "netlify dev"
```

7. Subir nuestras funciones a Netlify:

```
netlify deploy --prod
```
