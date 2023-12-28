import mongoose from 'npm:mongoose@7.6.3';
import {User} from "../types.ts";


const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String,required: true},
        email: { type: String,required: true},
        comicCollectionID: { type: Schema.Types.ObjectId ,required: true, ref: "ComicCollection"}
    },
    { timestamps: true }
);

export type UserModelType = mongoose.Document & Omit<User, "id">;

export default mongoose.model<UserModelType>("User", userSchema);
