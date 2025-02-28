import collectionRepository from "../repositories/collection.repository.js"
import { CollectionView, CollectionListView } from "../views/collection.view.js";


export const getCollections = async (req, res) => {
    const currentUserId = req.currentUserId;

    const collections = await collectionRepository.getCollections({ userId: currentUserId });
    return res.ok(CollectionListView(collections));
}

export const createCollection = async (req, res) => {
    const currentUserId = req.currentUserId;
    const { title, description } = req.body;

    const newCollection = await collectionRepository.createCollection({ title, description, userId: currentUserId });
    return res.ok(CollectionView(newCollection));
}