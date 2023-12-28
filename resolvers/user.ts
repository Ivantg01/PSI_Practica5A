import {ComicCollectionModelType} from "../db/comicCollection.ts";
import {UserModelType} from "../db/user.ts";
import ComicCollectionModel from "../db/comicCollection.ts";
import {ComicCollection} from "../types.ts";

export const User = {
    comicCollection: (parent: UserModelType): ComicCollection => {
        return parent.comicCollectionID;
    }
}