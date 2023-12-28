export const typeDefs = `#graphql
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
    
    type Query {
        user(id: ID!): User!
        users: [User!]!
        comic(id: ID!): Comic!
        comics: [Comic!]!
        comicCollection(id: ID!): ComicCollection!
        comicCollections: [ComicCollection!]!
    }
    
    type Mutation {
        addUser(name: String!, email: String!, comicCollection: ID!): User!
        updateUser(id:ID!, name: String, email: String, comicCollection: ID): User!
        deleteUser(id:ID!): User!
        addComic(name: String!, description: String!, format: String!): Comic!
        updateComic(id:ID!, name: String, description: String, format: String): Comic!
        deleteComic(id:ID!): Comic!
        addComicCollection(name: String!): ComicCollection!
        updateComicCollection(id: ID!, name: String): ComicCollection!
        addComicToCollection(comicCollectionID: ID!, comicID: ID!): ComicCollection!
        deleteComicFromCollection(comicCollectionID: ID!, comicID: ID!): ComicCollection!
        initDB: String!
    }
 `;