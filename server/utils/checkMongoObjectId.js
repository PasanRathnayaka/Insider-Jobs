import mongoose from "mongoose";

export const isNotValidObjectId = (mongoId) => {
    if (!mongoose.Types.ObjectId.isValid(mongoId)) {
        return true;
    }
};