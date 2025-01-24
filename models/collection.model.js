import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    userId: mongoose.Types.ObjectId
});

const Collection = mongoose.model('collections', CollectionSchema);
export default Collection;