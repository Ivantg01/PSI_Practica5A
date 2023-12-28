import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./gql/schema.ts";
import mongoose from "npm:mongoose@7.6.3";
import {Query} from "./resolvers/query.ts";
import {Mutation} from "./resolvers/mutation.ts";
import {ComicCollection} from "./resolvers/comicCollection.ts";
import {User} from "./resolvers/user.ts";

//cargamos el fichero de entorno .env con la URI de la base de datos
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const DB_URI = env["DB_URI"] || Deno.env.get("DB_URI") || "mongodb://localhost:27017/disc"
try {
  console.log("Database: connecting... ", DB_URI);
  const db = await mongoose.connect(DB_URI);
  console.log("Database: connected", db.connection.name);
} catch (error) {
  console.log("Database: error: ", error);
}

//creamos el servidor de Apollo
const server = new ApolloServer({typeDefs,
  resolvers:{
    Query,
    Mutation,
    ComicCollection,
    User
  },
});

const {url} = await startStandaloneServer(server);
console.log(`Server ready at ${url}`);



