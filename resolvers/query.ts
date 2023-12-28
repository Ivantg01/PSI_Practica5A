import {GraphQLError} from "graphql";
import UserModel from "../db/user.ts";
import ComicModel from "../db/comic.ts";
import ComicCollectionModel from "../db/comicCollection.ts"
import {UserModelType} from "../db/user.ts";
import {ComicModelType} from "../db/comic.ts";
import {ComicCollectionModelType} from "../db/comicCollection.ts";
import comic from "../db/comic.ts";
import {_format} from "https://deno.land/std@0.170.0/path/_util.ts";

export const Query = {
    users: async (): Promise<UserModelType[]> => {
        const users = await UserModel.find().populate({
            path:'comicCollectionID', model:'ComicCollection',
            populate:{
                path:'comics',model:'Comic'
            }
        });
        return users;
    },
    user: async (_:unknown, args: {id:string}): Promise<UserModelType> => {
        const user= await UserModel.findById(args.id).populate({
            path:'comicCollectionID', model:'ComicCollection',
            populate:{
                path:'comics',model:'Comic'
            }
        });
        if(!user){
            throw new GraphQLError(`No user found with ID ${args.id}`,{
                extensions:{code: "NOT_FOUND"},
            });
        }
       return user;
    },
    comics: async (): Promise<ComicModelType[]> => {
        const comics = await ComicModel.find().exec();
        return comics;
    },
    comic: async (_:unknown, args: {id:string}): Promise<ComicModelType> => {
        const comic= await ComicModel.findById(args.id);
        if(!comic){
            throw new GraphQLError(`No comic found with ID ${args.id}`,{
                extensions:{code: "NOT_FOUND"},
            });
        }
        return comic;
    },
    comicCollections: async (): Promise<ComicCollectionModelType[]> => {
        const comicCollections = await ComicCollectionModel.find().exec();
        return comicCollections;
    },
    comicCollection: async (_:unknown, args: {id:string}): Promise<ComicCollectionModelType> => {
        const comicCollection= await ComicCollectionModel.findById(args.id);
        if(!comicCollection){
            throw new GraphQLError(`No comicCollection found with ID ${args.id}`,{
                extensions:{code: "NOT_FOUND"},
            });
        }
        return comicCollection;
    },

}

