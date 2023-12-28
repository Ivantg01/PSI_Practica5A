import {ComicCollectionModelType} from "../db/comicCollection.ts";
import {ComicModelType} from "../db/comic.ts";
import ComicModel from "../db/comic.ts";

export const ComicCollection = {
    comics: async (parent: ComicCollectionModelType): Promise<ComicModelType[]> => {
        const comics= await ComicModel.find({_id: {$in:parent.comics}});
        return comics;
    }
}