# PSI_Practica5A API GraphQL Gestor de Comics
Practica asignatura arquitectura y Programación de Sistemas en Internet Práctica 5 - Grupo A

## Introduction
Ejemplo de API GraphQL para almacenar los datos de las colecciones de comics de diferentes usuarios
en una base de datos MongoDB utilizando Typescript, ApolloServer y Mongoose.<p>
![tools](https://skillicons.dev/icons?i=ts,mongodb,apollo)

## Esquema de datos GraphQL

```json
type Comic {
  id: ID!
  name: String!
  description: String!
  format: String!
}

type ComicCollection {
  id: ID!
  name: String!
  comics: [Comic!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  comicCollection: ComicCollection!
}
```

## Resolvers de GrahpQL

#### Queries

* ```user(id: ID!): User!```
* ```users: [User!]!```
* ```comic(id: ID!): Comic!```
* ```comics: [Comic!]!```
* ```comicCollection(id: ID!): ComicCollection!```
* ```comicCollections: [ComicCollection!]!```

#### Mutations
* ```addUser(name: String!, email: String!, comicCollection: ID!): User!```
* ```updateUser(id:ID!, name: String, email: String, comicCollection: ID): User!```
* ```deleteUser(id:ID!): User!```
* ```addComic(name: String!, description: String!, format: String!): Comic!```
* ```updateComic(id:ID!, name: String, description: String, format: String): Comic!```
* ```deleteComic(id:ID!): Comic!```
* ```addComicCollection(name: String!): ComicCollection!```
* ```updateComicCollection(id: ID!, name: String): ComicCollection!```
* ```addComicToCollection(comicCollectionID: ID!, comicID: ID!): ComicCollection!```
* ```deleteComicFromCollection(comicCollectionID: ID!, comicID: ID!): ComicCollection!```
* ```initDB: String!```

## Variables de entorno
Se incluye un fichero .env con las variables de entorno necesarias:
* ```DB_URI``` URI de la base de datos MongoDB


## Enunciado
Se utilizarán tres tipos principales: Usuario, Comic y Colección de Comics.
#### Tipos de Datos:
1. Usuario:
    - Atributos: `id`, `nombre`, `correoElectrónico`, 'colección de comics.
    - Objetivo: Gestionar información sobre usuarios que pueden tener cómics asociados.
2. Comic:
    - Atributos: `id`, `título`, `descripción`, `formato`.
    - Objetivo: Manejar información individual de cómics.
3. Colección de Comics:
    - Atributos: `id`, `nombre`, `comics` (una lista de cómics pertenecientes a la colección).
    - Objetivo: Administrar colecciones que contienen cómics específicos.

#### Funcionalidades Esperadas:
- Usuarios:
    - Crear un nuevo usuario.
    - Obtener información de un usuario por su ID.
    - Obtener una lista de todos los usuarios.
    - Actualizar información de un usuario existente.
    - Eliminar un usuario.
- Cómics:
    - Crear un nuevo cómic.
    - Obtener información de un cómic por su ID.
    - Obtener una lista de todos los cómics.
    - Actualizar información de un cómic existente.
    - Eliminar un cómic.

#### Encadenado de Información:
Se esperan consultas GraphQL que permitan obtener información encadenada. Por ejemplo,
en una colección de un usuario guardaremos los comics como un array de IDs y
después lo devolveremos como un objeto completo gracias a un encadenado.