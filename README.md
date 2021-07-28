# copa-america-test-lb4

LoopBack 4 Test - CONMEBOL Copa América 2021

## Instalacion e inicializacion de aplicacion:

- Correr Script user.sql e importar base de datos ca2021.sql
- Para resolver dependencias:
  ```
  npm install
  ```

* Para correr la aplicacion, acceder al directorio copa-america-api y luego:

  ```
  npm start
  ```

## Requerimientos (Endpoints): 🚀

- Realice un Endpoint de tipo GET en el cual devuelva un json con los siguiente objetos
  datos de la copa(fecha, sedes, edición, organizador, etc.), grupos y las selecciones
  que componen cada grupo.

```

request:GET
http://localhost:3000/global-cup-info

```

- Realice un Endpoint de tipo GET en el cual por medio del nombre del país pueda obtener
  el apellido, número y posición de cada jugador y su director técnico.

```

request:GET
params: {countryName}: string
http://localhost:3000/countries/{countryName}/team-players

```

- Realice un Endpoint de tipo PUT o PATCH en el cual pueda cambiar el número de
  camiseta y posición de un jugador por medio del id.

```

request:PATCH
params:
{id}: number
{
"shirtNumber": number,
"playerPositionId": number
}
http://localhost:3000/players/{id}

```

- Realice un método POST donde pueda cargarse un partido cualquiera, en el que puedan
  guardarse todos los datos de la tabla y tablas asociadas a un partido.

```

request:POST
http://localhost:3000/matches

```

- Realice un Endpoint de tipo GET en el cual pueda obtener por medio del número de
  partido un json con la siguiente estructura: fecha, hora del partido, ciudad, estadio sede
  del compromiso, fase a la que corresponde el partido, equipo local, equipo visitante,
  arbitro principal.

```

request:POST
param:{matchNumber}: number
http://localhost:3000/matches/{matchNumber}/byMatchNumber

```

```

```
