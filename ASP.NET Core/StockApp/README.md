# Stock Market Api

Se trata de una API desarrollada en ASP.NET Core y basada en controladores.

Mediante Entity Framework Core la aplicación se conecta a una base de datos PostgreSQL la cual almacena información sobre
los _Stocks_, los _Comments_ realizados sobre los _Stocks_ y los usuarios de la aplicación (el modelo _User_ extiende de
la clase _IdentityUser_).

Con el fin de ocultar los ID's númericos de nuestros registros se hace uso del paquete _Sqids_ con el fin de ofuscar los
ID's.

Se utilizando _data annotations_ para la validación de los DTO's de entrada y de igual forma se crearon DTO's para la
modelar las respuestas emitidas por la aplicación.

Los controladores de las colecciones _Stocks_ y _Comments_ exponen _endpoints_ para obtener registros de forma pagina,
buscar un registro por ID, crear, actualizar y hacer un _soft delete_ de los registros. Por otro lado el controlador
_Auth_ expone un _endpoint_ de registro y inicio de sesión (acceso publico) ademas de un _endpoint_ para refrescar el
_token_ de autenticación (acceso a usuarios autenticados) y otros para promover o degradar a un usuario del rol de
administrador (acceso solo para usuarios administradores).

Se implemento un sistema de autenticación y autorización basado en JWTs, para la verificación del _refresh token_ se creo
un _Authorization Filter_, este además verifica que el _email_ guardado en el _token_ y en el _refresh token_ sean iguales
asi como su emisor.

La aplicación implementa un politica de CORS más restringida si esta se encuentra en modo de producción y una politica de
_rate limit_ que es más restringida en los _endpoints_ autenticación.

**Nota: La información de configuración sensible es almacenada en el _secret manager_.**

## Tecnologias Utilizadas

- ASP.NET Core 9.0
- Microsoft.AspNetCore.Authentication.JwtBearer 9.0.4
- Microsoft.AspNetCore.Identity.EntityFrameworkCore 9.0.4
- Microsoft.EntityFrameworkCore.Design 9.0.4
- Microsoft.Extensions.Identity.Core 9.0.4
- Microsoft.Extensions.Identity.Core 9.0.4
- Npgsql.EntityFrameworkCore.PostgreSQL 9.0.4
- Sqids 9.0.4

## ¿Como utilizar el proyecto?

1. Clonar el repositorio

```
git clone https://github.com/YaelAram/RepoCurriculum.git
```

2. Navegar a la carpeta del proyecto

3. Instalar las dependencias del proyecto

```
dotnet restore
```

4. Definir las constantes guardadas en el _secret manager_

```
// Alfabeto para utilizado para ofuscar los IDs de los registros de comentarios
SqidSettings:CommentsAlphabet

// Alfabeto para utilizado para ofuscar los IDs de los registros de stocks
SqidSettings:Alphabet

// Contiene el nombre de usuario de la base de datos
PostgreSqlSettings:Username

// Contiene la contraseña del usuario de la base de datos
PostgreSqlSettings:Password

// Contiene la clave para la generacion de los tokens JWT
JwtSetting:SigningKey

// Contiene la clave para la generacion de los refresh tokens
JwtSetting:RefreshTokenSigningKey
```

5. Verificar las configuraciones del archivo _appsettings.json_

```
"PostgreSqlSettings": {
  "Host": "localhost",
  "Port": "5432",
  "Database": "stocksmarket"
},
"SqidSettings": {
  "HashSize": "10"
},
"JwtSetting": {
  "Issuer": "https://localhost:7281",
  "Audience": "https://localhost:7281"
}
```

6. Ejecutar el servidor

```
dotnet run
```
