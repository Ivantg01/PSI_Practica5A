import mongoose from 'npm:mongoose@7.6.3';
import {ComicCollection} from "../types.ts";
import {Comic} from "../types.ts";

const Schema = mongoose.Schema;

const comicCollectionSchema = new Schema(
    {
        name: { type: String,required: true},
        comics: [{ type: Schema.Types.ObjectId ,required: true, ref: "Comic"}]
    },
    { timestamps: true }
);

export type ComicCollectionModelType = mongoose.Document & Omit<ComicCollection, "id" | "comics"> &
    {comics:Schema.Types.ObjectId[]};

export default mongoose.model<ComicCollectionModelType>("ComicCollection", comicCollectionSchema);
