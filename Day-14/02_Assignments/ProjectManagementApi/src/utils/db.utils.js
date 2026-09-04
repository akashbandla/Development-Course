import mongoose from "mongoose";
import { activeFilter } from "./dbFilter.utils.js";

export async function checkIdExists(Model, id){
    if(!mongoose.isValidObjectId(id)){
        throw new Error(`Invalid mongoose Id: ${id}`);
    }
    const exists = await Model.exists({
        _id: id,
        ...activeFilter
    });

    return Boolean(exists);
}