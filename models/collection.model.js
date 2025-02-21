import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    userId: mongoose.Types.ObjectId
});

CollectionSchema.virtual("user", {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

const Collection = mongoose.model('collections', CollectionSchema);
export default Collection;