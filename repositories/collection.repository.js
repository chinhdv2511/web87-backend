import Collection from "../models/collection.model.js";

const collectionRepository = {
    getCollections: async ({ userId }) => {

        const query = {};

        if (userId) {
            query.userId = userId;
        }

        const collections = await Collection.find(query);

        return collections;
    },

    createCollection: async ({ title, description, userId }) => {
        const newCollection = new Collection();
        newCollection.title = title;
        newCollection.description = description;
        newCollection.userId = userId;
        newCollection.createdAt = new Date();

        await newCollection.save();

        return newCollection.toObject();
    }

};

export default collectionRepository;