# Atlas-movies
Proyecto realizado para el skill factory dado por Avalith, El proyecto fue realizado con React para el frontend y Node js + MySQL para el backend.
Adjunto al proyecto se encuentra el archivo sql con la construcion de las tablas en la base de datos.

# Consigna

Deberán crear una API donde el usuario pueda loguearse utilizando
su email y su password, y al ser exitoso deberá devolver un token
que quedará persistido en el Frontend.
Deberán crear un sistema para una empresa dedicada al alquiler de
películas, donde un usuario logueado puede ver el listado de
películas disponibles y agregarla a sus favoritos, y desde su
listado personal de favoritos poder quitar una película de la misma.
Además de ello, los usuarios con rol de administrador pueden crear y
modificar películas. Para lograr esto, deberán diseñar los endpoints
y tablas que consideren necesarios.
Para simplificar la complejidad de servir las carátulas de las películas
al usuario, en su tabla deberán guardar una URL con la dirección de
la imagen que luego será utilizada por el frontend.
Algunas consideraciones y consejos:

● Deberan utilizar MySQL o PostgreSQL.

● Sean prolijos y consistentes con su código, nombre de tablas y
columnas, estructura del proyecto, etc.

● Utilicen archivos de configuración y/o variables de entorno

● Sería recomendable que si ocurre un error con el request de un
usuario, además de responder con el código correcto enviar un
texto aclarando la causa del fallo que podría ser utilizado por el
frontend para mostrar el mensaje.

Frontend

Utilizar “create react app” para generar la aplicación y React Router
para crear las siguientes rutas:

/auth -&gt; publica
Deberán crear un formulario de Login, y persistir el token.
Los inputs del formulario deberán de estar validados.

/home -&gt; publica
Deberán crear una vista de Home y esta deberá ser la ruta por
principal y por defecto en la cual deberá contar con un Navbar y con
un botón de Login que al presionarlo deberá redirigir a la ruta /auth.
En esta vista deberán mostrar el catálogo de películas obtenidas
desde el backend y en caso de que esté logueado el usuario mostrará
un botón en cada película para agregarla a favoritos.

/favourites -&gt; el usuario debe estar logueado
Deberán mostrar las películas favoritas del usuario y permitir
removerlas de la misma.

/edit-movie -&gt; el usuario debe ser administrador
Deberán crear una vista en donde puedan editar una película a través
de un formulario.

/add-movie -&gt; el usuario debe ser administrador
Deberán crear una vista en donde puedan agregar una película a
través de un formulario.
Los inputs del formulario deberán de estar validados y evitar enviar un
request si algo está incorrecto.

# Para realizar el proyecto se utilizo
---frontend ---
<br/>
<p>React -
React Router -
useForm -
axios<p/>
---backend---
<br/>
<p>Node js -
express -
yup -
mysql2 -
jsonwebtoken -
bcrypt -
dotenv
<p/>


# Instalacion
Para correr el proyecto es necesario instalar las dependencias.
```
cd ./Atlas-frontend/
npm i // yarn 
```
```
cd ./Atlas-backend/
npm i // yarn 
```
# MySQL Schema





