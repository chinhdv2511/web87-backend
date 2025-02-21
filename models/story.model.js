import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    title: String,
    collectionId: { type: mongoose.Types.ObjectId, ref: 'collections' },
    content: String,
    viewCount: Number,
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    createdAt: Date,
    updatedAt: Date,
    images: [String]
});

StorySchema.virtual("user", {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

StorySchema.virtual("collection", {
    ref: 'collections',
    localField: 'collectionId',
    foreignField: '_id',
    justOne: true
});

const Story = mongoose.model('stories', StorySchema);
export default Story;