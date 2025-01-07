# Sistema de Control

## Planteamiento del problema

Las parrillas Coreanas se caracterizan por proveer al cliente con una parrilla a gas y la comida necesaria para el
mismo se prepare sus alimentos asi como ofrecer un comedor privado, lo que provoca que sea necesario contar con personal
que este constantemente al pendiente de los comedores privados, haya riesgo de detectar una fuga de gas demasiado tarde
por lo aislado y cerrados que suelen ser los comedores privados y que el calor generado por las parillas vuelva
demasiado caliente el interior del comedor.

## Solución propuesta

Implementar un sistema que se encargue de monitorear las condiciones del comedor privado, utilizando los siguientes
sensores y actuadores:

- **Sensor DHT11 y Ventilador**: Para monitorear y controlar la temperatura dentro del comedor.
- **Sensor de Luz (Fotoresistencia) y Led**: Para monitorear y controlar la iluminación dentro del comedor.
- **Sensor MQ2 y Zumbador**: Para monitorear y alertar a los clientes y personal del restaurante que la concentración
  de gas ha supero del limite.
- **Sensor de Presencia y Zumbador**: Para monitorear y alertar al personal del restaurante que el comedor ha sido
  abandonado por el cliente y debe ser limpiado antes de atender al siguiente cliente.
