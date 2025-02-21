import Story from "../models/story.model.js";

const storyRepository = {
    getAndPaginateStories: async ({ keyword, page, pageSize, orderBy, orderDirection }) => {

        const query = {};
        if (keyword) {
            query.title = { $regex: new RegExp('.*' + keyword + '.*', 'i') }
        }

        const totalStories = await Story.countDocuments(query);
        const totalPages = Math.ceil(totalStories / pageSize);

        const sort = {};
        sort[orderBy] = orderDirection == 'asc' ? 1 : -1;

        const stories = await Story.find(query, {}, {
            limit: pageSize,
            skip: (page - 1) * pageSize,
            sort: sort
        })
            .populate('collectionId', 'title')
            .populate('userId', 'fullName')
            .lean();

        // lean -> không sử dụng được các hàm save

        return { total: totalStories, totalPages: totalPages, stories };
    },

    getStoryById: async (id) => {
        const story = await Story.findById(id).populate('collectionId').populate('userId').lean();
        return story;
    },

    createStory: async ({ title, content, collectionId, images, userId }) => {
        const newStory = new Story();
        newStory.title = title;
        newStory.content = content;
        newStory.collectionId = collectionId;
        newStory.images = images;
        newStory.userId = userId;
        newStory.viewCount = 0;
        newStory.createdAt = new Date();
        newStory.updatedAt = null;

        await newStory.save();

        return newStory.toObject();
    },

    updateStory: () => {

    },

    updateStoryViewCount: () => {

    }
};

export default storyRepository;