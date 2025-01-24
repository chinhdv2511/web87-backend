import User from "../models/user.model.js";
import Collection from "../models/collection.model.js";
import Story from "../models/story.model.js";

const tutorialRepository = {

    c1: async () => {
        const user = await User.find({ fullName: 'Carmela Aughton' });
        return user;
    },

    c2: async () => {
        const users = await User.find({ fullName: { $in: ['Carmela Aughton', 'Quentin Spencock', 'Andrew Gerriet'] } });
        return users;
    },

    c3_1: async () => {
        const users = await User.find({}, { fullName: 1, email: 1, _id: 0 });
        return users;
    },

    c3_2: async () => {
        const users = await User.find({ fullName: { $regex: /^(Andrew).*/i } });
        return users;
    },

    c4: async () => {
        const users = await User.find({ fullName: { $regex: /.*ke.*/i } });
        return users;
    },

    c5: async () => {
        const users = await User.find({ email: { $regex: /.*\.com$/i } });
        return users;
    },

    c6: async () => {
        const collections = Collection.find({ userId: '678e661ee38474ff6d867504' });
        return collections;
    },

    c7: async () => {
        const collections = await Collection.find({ title: { $regex: /.*fer.*/i } });
        return collections;
    },

    c8: async () => {
        const collections = await Collection.find({}).sort({ createdAt: -1 });
        return collections;
    },

    c10: async () => {
        // lấy ra các ids của user có fullName = "Carmela Aughton"
        const userRecords = await User.find({ fullName: 'Alexi Peartree' }, { _id: 1 });
        const userIds = userRecords.map(record => record._id);

        console.log(userIds)

        const collections = await Collection.find({ userId: { $in: userIds } });
        return collections;
    },

    c11: async () => {
        // lấy ra các ids của user có fullName = "Carmela Aughton"
        const userRecords = await User.find({ email: 'agerriet16@livejournal.com' }, { _id: 1 });
        const userIds = userRecords.map(record => record._id);

        const stories = await Story.find({ userId: { $in: userIds } });
        return stories;
    },

    c12: async () => {
        // lấy ra các ids của user có fullName = "Carmela Aughton"
        const collectionRecords = await Collection.find({ title: /.*Spi.*/i }, { _id: 1 });
        const collectionIds = collectionRecords.map(record => record._id);

        const stories = await Story.find({ collectionId: { $in: collectionIds } });
        return stories;
    },
};

export default tutorialRepository;