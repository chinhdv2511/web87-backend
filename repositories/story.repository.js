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

    createStory: () => {

    },

    updateStory: () => {

    },

    updateStoryViewCount: () => {

    }
};

export default storyRepository;