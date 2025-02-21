import collectionRepository from "../repositories/collection.repository.js"
import { CollectionView } from "../views/collection.view.js";


export const getCollections = async (req, res) => {
    const currentUserId = req.currentUserId;

    const collections = collectionRepository.getCollections({ userId: currentUserId });
    return res.status(200).json({
        message: "OK",
        data: CollectionView(collections)
    });
}

export const createCollection = async (req, res) => {
    const currentUserId = req.currentUserId;
    const { title, description } = req.body;

    const newCollection = await collectionRepository.createCollection({ title, description, userId: currentUserId });
    return res.status(200).json({
        message: "OK",
        data: CollectionView(newCollection)
    });
}