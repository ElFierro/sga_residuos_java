# SISTEMA DE GESTIÓN AMBIENTAL (JAVA)

## APIS 📋 

#### APP-USER

Este microservicio se encarga de:
- Crear, consultar, actualizar y eliminar usuarios
- Obtener una lista de roles validos
- Valida si un email ya existe

#### APP-WASTE

El microservicio se encarga de:
- Crear, consultar, actualizar y eliminar residuos
- Obtener una lista de clasificación de residuos validos
- Obtener una lista de tipos de residuos validos
- Obtener una lista de las rutas 

## TECNOLOGÍAS UTILIZADAS 📋

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

#### EMPAQUETADO

- Jar

#### BASE DE DATOS

- MongoDB

## INSTALACIÓN 🔧

#### CLONAR EL RESPOSITORIO

- Rama Master

```
https://g1talentotech@dev.azure.com/g1talentotech/Manejo%20de%20Residuos/_git/Manejo%20de%20Residuos
```

#### CONFIGURE EL ARCHIVO SETTINGS.XML (OPCIONAL)

Descargue el siguiente archivo **settings.xml** para evitar conflictos con el core ya que está alojado en GitHub.

Guarde este archivo en la ruta donde tenga la carpeta **.m2**

```
https://drive.google.com/drive/folders/1NudAdKdUWiDuq-3yE1gr7t6eJJnzR5VP
```

#### INSTALAR MAVEN EN CADA PROYECTO

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


## Autores ✒️

- Cristian Fierro
