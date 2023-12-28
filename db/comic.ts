import mongoose from 'npm:mongoose@7.6.3';
import {Comic} from "../types.ts";

const Schema = mongoose.Schema;

const comicSchema = new Schema(
    {
        name: { type: String,required: true},
        description: { type: String,required: true},
        format: { type: String,required: true},
    },
    { timestamps: true }
);

export type ComicModelType = mongoose.Document & Omit<Comic, "id">;

export default mongoose.model<ComicModelType>("Comic", comicSchema);

