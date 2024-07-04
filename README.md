# SISTEMA DE GESTIÓN AMBIENTAL (JAVA)

## INSTALACIÓN 🔧

#### CLONAR EL RESPOSITORIO

- Rama Master

```
https://github.com/ElFierro/sga_residuos_java
```

#### CONFIGURE EL ARCHIVO SETTINGS.XML (OPCIONAL)

Descargue el siguiente archivo **settings.xml** para evitar conflictos con el core ya que está alojado en GitHub.

Guarde este archivo en la ruta donde tenga la carpeta **.m2**

```
https://drive.google.com/drive/folders/1NudAdKdUWiDuq-3yE1gr7t6eJJnzR5VP
```

#### INSTALAR MAVEN EN CADA MICROSERVICIO

Lo puede hacer con el comando:

```
mvn install
```

Asegúrese que se generaron los archivos **jar** en cada proyecto en la carpeta **target**. 

#### EJECUTE EL ARCHIVO DOCKER-COMPOSE

En la ruta **...\Apis** es decir esta misma carpeta **ejecutamos** en una **terminal** el siguiente comando para levantar el archivo Docker-compose:

```
Docker-compose up --build -d
```
#### EJECUTAR PROYECTO WEB

Abrir el proyecto sga-web y ejecutar el comando

```
npm install

```
y luego el comando 

```
ng serve
```
y luego acceda al siguiente link:

http://localhost:4200/home

## APIS 📋 

### CORE

Estructura basica del proyecto.

### MICROSERVICIOS

#### APP-USER

Se encarga de:
- Crear, consultar, actualizar y eliminar usuarios
- Obtener una lista de roles validos
- Valida si un email ya existe

#### APP-WASTE

Se encarga de:
- Crear, consultar, actualizar y eliminar residuos
- Obtener una lista de clasificación de residuos validos
- Obtener una lista de tipos de residuos validos
- Obtener una lista de las rutas 

#### APP-AUTH

Se encarga de:

- Registro de usuarios
- Inicio de sesión y generación del token.

#### APP-REPORT

Se encarga de:

- Crear, consultar, actualizar y eliminar los reportes
- Generar un archivo pdf con los reportes de usuarios

#### APP-ROUTE

Se encarga de:

- Crear, consultar, actualizar y eliminar las rutas y coordenadas

### PROYECTO WEB

#### SGA-WEB

Página web interactiva encargada de consumir todos los microservicios propuestos.

## TECNOLOGÍAS UTILIZADAS 📋

### CORE

- Maven arquetipos

### MICROSERVICIOS

#### FRAMEWORK

- Spring boot - versión 3.2.5

#### ENTORNO DE DESARROLLO

- JDK versión 17

#### MANEJADOR DE DEPENDENCIAS

- Maven

#### DEPENDENCIAS

- Spring BootDevTools
- Springdoc (swagger) - 2.3.0
- Springboot Data MongoDB
- Spring web
- Lombok
- Core 1.0 - (Maven arquetipos)
- Security crypto
- Starter mail
- Jasperreports
- Jsonwebtoken

#### EMPAQUETADO

- Jar

#### BASE DE DATOS

- MongoDB

#### CONTENEDOR

- Docker

### PROYECTO WEB

#### FRAMEWORK

Angular 17

#### LIBRERIAS

- Google maps
- Tailwinds css
- Apexcharts
- Sweetalert2
- Ngx-pagination
- Ngx-slick-carousel
- Slick-carousel

## Autor ✒️

- Cristian Fierro
