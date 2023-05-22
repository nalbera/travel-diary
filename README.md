# API - Registro de viajes 📋
## Objetivos del proyecto
- Construir un backend utilizando Express, Sequelize y MySQL
- Practicar y afianzar nuevas tecnologías aprendidas (JWT, Express Validator, Express Fileupload, Nodemailer, Sharp)
- Aplicar mejores prácticas de programación
## Descripción
La idea es crear una aplicación en donde los usuarios puedean registrarse y publicar entradas sobre viajes realizados.
Cada entrada tendrá un título, una descripción, el lugar "visitado" y hasta 3 fotos. Además cada entrada puede ser votada con un puntaje de entre 1 y 5 puntos.
Para poder publicar una entrada el usuario deberá crearse como tal y activar el registro mediante un mail recibido con un enlace de "activación" para luego poder ralizar el login correspondiente y obtener un token para así poder publicar, modificar y eliminar entradas y votar otras ya existentes con la restricción que no podrá votar su propia entrada ni votar mas de una vez la misma entrada que ya votó.
Los "visitantes", usuarios no registrados en la app, solamente podrán ver las entradas creadas con un mínimo detalle pero no podrán votarlas.
Cada entrada podrá ser modificada o eliminada por el creador de la misma o un usuario administrador.
## API Endpoints
### Entradas:
- POST - /entries
    - Crea una entrada.
    - Se requiere token.
- GET - /entries
    - Devuelve un JSON con todas las entradas y permite buscar una entrada específica.
    - No requiere token.
- GET - /entries/:id
    - Devuelve un JSON con la información de una entrada específica.
    - No requiere token.
- DELETE - /entries/:id
    - Borrar una entrada.
    - Requiere token ser usuario administrador o el propietario de la entrada.
- PATCH - /entries/:id
    - Edita el lugar o la descripción de una entrada.
    - Requiere token, ser usuario administrador o el propietario de la entrada.
- POST - /entries/:id/votes
    - Permite registrar el voto de una entrada
    - Requiere token
- POST - /entries/:id/photos
    - Permite agregar una imagen a una entrada
    - Requiere token y ser el propietario de la entrada
- DELETE - /entries/:id/photos/:photoID
    - Permite eliminar una imagen de la entrada
    - Requiere token y ser el propietario de la entrada
### Usuarios
- POST - /users
    - Crea un usuario pendiente de validación
- POST - /users/login
    - Realiza el login de usuario y devuelve el token
- GET - /users/validate/:regCode
    - Valida el usuario creado mediante un codigo de registración enviado por mail
- GET - /users/:id
    - Devuelve la información del usuario
    - Requiere token
    - Si es el propietario devolverá mayor detalle
- PUT - /users/:id
    - Editar el usuario (name, mail, avatar)
    - Solo el propio usuario
    - Requiere token
- DELETE - /users/:id
    - Elimina el usuario
    - Solo el propio usuario o un administrador
    - Requiere token
- PATCH - /users/modify-password
    - Edita la contraseña
    - Solo el mismo usuario
    - Requiere token
- POST - /users/recover-password
    - Permite recuperar contraseña
    - Pide un mail donde se enviará un codigo para recuperación
- POST - /users/reset-password
    - Pide código de recuperación y nueva password

## BoilerPlate
Para poder probar el proyecto, una vez clonado, deberá crear un archivo .env con la siguiente forma:
```
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_NAME=diary
DB_DIALECT=mysql

SECRET=

ACTIVE_ACOUNT_HOST=http://127.0.0.1:3001/users/validate/
USERNAME_MAIL=
SMTP_SERVER=
SMTP_PWD=
SMTP_FROM=
DIRECTORY_UPLOAD=../upload
```
Reemplazar los datos con sus propias credenciales. El serivicio utilizado para el envío de email es sendgrid.
Más información https://app.sendgrid.com/
La variable de entorno SECRET es usada por JWT
### Base de datos
Deberá crear una base de datos MySQL llamada diary y correr el script (script.sql) proporcionado para crear las tablas de la base de datos.

### Correr el proyecto en producción⚙️
```
npm start
```
### Correr el proyecto en desarrollo⚙️
```
npm run dev
```
## Tecnologías utilizadas
- Express
- Sequelize
- MySQL
- Nodemailer
- Sharp
- JWT (Jsonwebtoken)
- BycriptJs
- Express Validator
- Express Fileupload
- UUIDV4