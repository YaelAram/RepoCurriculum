# Carpeta Assets

Esta carpeta contiene dos archivos:

- Groups.json: Este archivo contiene un arreglo con todos los grupos disponibles para el semestre 2025-1,
  este arreglo unicamente contiene strings con el nombre del grupo. Por ejemplo "1959", "1007", etc.
- GroupsInfo.json: Este archivo contiene un objeto con cuya clave contiene el nombre de un grupo y su valor es un
  arreglo de objetos, cada objeto contiene la informacion mas relevante para describir una materia. Por ejemplo,
  nombre del profesor, dias de clase, horario de clase, grupo, nombre de la materia, etc.

A continuacion se muestra un ejemplo de un objeto que representa un grupo, un grupo contiene un arreglo de este
tipo de objetos.

```
{
  "classroom":"VIRTUAL",
  "days":"Sab",
  "end":1711738800000,
  "group":"1007",
  "id":"0013",
  "preference":0,
  "profesor":"ORDOÑEZ ROSALES MARTIN",
  "start":1711731600000,
  "students":60,
  "subject":"TEMAS ESPECIALES DE BASES DE DATOS"
}
```

## ¿Por qué archivos estaticos y no una API Rest?

Se llego a esta decision debido a que la API Rest de la escuela bloquea las peticiones de otros sitios web
y la creacion de una API Rest propio habria requerido de subir un servidor propio que en la mayoria de los casos
unicamente se mantiene activo por 24h despues de la ultima peticion.

Utilizando archivos estaticos logramos obtener el mismo resultado, sin la necesidad de realizar una peticion HTTP,
para favorecer la velocidad se organizo la informacion en forma de MAP por lo que no necesitamos iterar sobre un arreglo
sino unicamente buscar la informacion del grupo de interes.
