import {GraphQLError} from "graphql";
import UserModel from "../db/user.ts";
import ComicModel from "../db/comic.ts";
import ComicCollectionModel from "../db/comicCollection.ts"
import {UserModelType} from "../db/user.ts";
import {ComicModelType} from "../db/comic.ts";
import {ComicCollectionModelType} from "../db/comicCollection.ts";
import comic from "../db/comic.ts";




export const Mutation = {
    addUser: async (_:unknown, args:{name:string,email:string,comicCollection:string}
    ): Promise<UserModelType> => {
        const user ={
            name: args.name,
            email: args.email,
            comicCollectionID: args.comicCollection
        };
        const newUser = await UserModel.create(user);
        return user;
    },
    updateUser: async (_:unknown, args:{id:string,name:string,email:string,comicCollection:string}
    ): Promise<UserModelType> => {
        const user= await UserModel.findByIdAndUpdate(args.id,
            {name: args.name, email: args.email, comicCollectionID: args.comicCollection},
            {new:true, runValidators:true});
        if(!user){
            throw new GraphQLError(`No user found with ID ${args.id}`,{
                extensions:{code: "NOT_FOUND"},
            });
        }
        return user;
    },
    deleteUser: async (_:unknown, args:{id:string}
    ): Promise<UserModelType> => {
        const user= await UserModel.findByIdAndDelete(args.id);
        if(!user){
            throw new GraphQLError(`No user found with ID ${args.id}`,{
                extensions:{code: "NOT_FOUND"},
            });
        }
        //borramos la colección de comics del usuario
        const comicCollection = await ComicCollectionModel.findByIdAndDelete(user.comicCollectionID);
        //borramos los comics del usuario
        if(comicCollection){
            await ComicModel.deleteMany({_id: {$in:comicCollection.comics}});
        }
        return user;
    },
    addComic: async (_:unknown, args:{name:string, description:string, format:string}
    ): Promise<ComicModelType> => {
        const comic= {
            name:args.name,
            description:args.description,
            format:args.format
        };
        const newComic= await ComicModel.create(comic);
        return newComic;
    },
    updateComic: async (_:unknown, args:{id:string,name:string, description:string, format:string}
    ): Promise<ComicModelType> => {
        const comic= await ComicModel.findByIdAndUpdate(
            args.id,
            {name:args.name, description:args.description, format:args.format},
            { new:true, runValidators:true }
        );
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.id}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        return comic;
    },
    deleteComic: async (_:unknown, args:{id:string}
    ): Promise<ComicModelType> => {
        const comic= await ComicModel.findByIdAndDelete(args.id);
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.id}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        //Borramos comic de las colecciones
        await ComicCollectionModel.updateMany({comics: args.id},{ $pull: {comics: args.id}})
        return comic;
    },
    addComicCollection: async (_:unknown, args:{name:string}
    ): Promise<ComicCollectionModelType> => {
        const comicCollection= {
            name:args.name,
        };
        const newComicCollection= await ComicCollectionModel.create(comicCollection);
        return newComicCollection;
    },

    updateComicCollection: async (_:unknown, args:{id:string,name:string}
    ): Promise<ComicCollectionModelType> => {
        const comicCollection= await ComicCollectionModel.findByIdAndUpdate(args.id,
            {name:args.name},
            {new:true, runValidators:true}
        );
        if(!comicCollection){
            throw new GraphQLError(`No comicCollection found with id ${args.id}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        return comicCollection;
    },

    addComicToCollection: async (_:unknown, args: {comicCollectionID:string,comicID:string}): Promise<ComicCollectionModelType> => {
        const comicCollection= await ComicCollectionModel.findById(args.comicCollectionID);
        if(!comicCollection){
            throw new GraphQLError(`No comicCollection found with id ${args.comicCollectionID}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        const comic= await ComicModel.findById(args.comicID);
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.comicID}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        //Añadimos comic a la colección
        comicCollection.comics.push(comic);
        await comicCollection.save();
        return comicCollection;
    },
    deleteComicFromCollection: async (_:unknown, args: {comicCollectionID:string,comicID:string}): Promise<ComicCollectionModelType> => {
        const comicCollection= await ComicCollectionModel.findById(args.comicCollectionID);
        if(!comicCollection){
            throw new GraphQLError(`No comicCollection found with id ${args.comicCollectionID}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        const comic= await ComicModel.findById(args.comicID);
        if(!comic){
            throw new GraphQLError(`No comic found with id ${args.comicID}`,{
                extensions: {code: "NOT_FOUND"},
            });
        }
        //Borramos comic de la colección
        comicCollection.comics.pull(comic);
        await comicCollection.save();
        return comicCollection;
    },
    initDB: async (_:unknown, args: {}): Promise<string> => {
        try {
            await UserModel.deleteMany({}).exec();
            await ComicModel.deleteMany({}).exec();
            await ComicCollectionModel.deleteMany({}).exec();

            const s1 = await ComicModel.create({ name: "SpiderMan1",description:"Numero1",format:"magazine"});
            const s2 = await ComicModel.create({ name: "SpiderMan2",description:"Numero2",format:"magazine"});
            const s3 = await ComicModel.create({ name: "SpiderMan3",description:"Numero3",format:"magazine"});
            const h1 = await ComicModel.create({ name: "Hulk1",description:"Numero1",format:"magazine"});
            const h2 = await ComicModel.create({ name: "Hulk2",description:"Numero2",format:"magazine"});
            const h3 = await ComicModel.create({ name: "Hulk3",description:"Numero3",format:"magazine"});
            const cc1= await ComicCollectionModel.create({name: "comicspeter",comics:[s1,s2,s3]});
            const cc2= await ComicCollectionModel.create({name: "comicsbruce",comics:[h1,h2,h3]});
            const peter= await UserModel.create({ name: "Peter", email:"peter@123.com",comicCollectionID:cc1})
            const bruce= await UserModel.create({ name: "Bruce", email:"Bruce@456.com",comicCollectionID:cc2})
            console.log("DB initialized");
        } catch (e) {
            console.log(e.message);
        }
        return "DB initialized";
    }
}