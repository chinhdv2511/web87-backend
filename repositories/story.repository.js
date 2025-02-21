import Story from "../models/story.model.js";

const storyRepository = {
    getAndPaginateStories: async ({ keyword, page, pageSize, orderBy, orderDirection }, populate = []) => {

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
            sort: sort,
            populate: populate
        });

        return { total: totalStories, totalPages: totalPages, stories };
    },

    getStoryById: async (id) => {
        const story = await Story.findById(id);
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

        return newStory;
    },

    updateStory: () => {

    },

    updateStoryViewCount: () => {

    }
};

export default storyRepository;