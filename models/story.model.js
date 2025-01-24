import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    title: String,
    collectionId: mongoose.Types.ObjectId,
    content: String,
    viewCount: Number,
    userId: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    images: [String]
});

const Story = mongoose.model('stories', StorySchema);
export default Story;