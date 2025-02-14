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
        });

        return { total: totalStories, totalPages: totalPages, stories };
    },

    createStory: () => {

    },

    updateStory: () => {

    },

    updateStoryViewCount: () => {

    }
};

export default storyRepository;