import storyRepository from "../repositories/story.repository.js";

export const getStories = async (req, res) => {
    let { keyword, page, pageSize, orderBy, orderDirection } = req.query;

    if (!page || page <= 0) page = 1;
    if (!pageSize || pageSize <= 0) pageSize = 15;
    if (!orderBy) orderBy = 'createdAt';
    if (!orderDirection) orderDirection = 'desc';

    console.log(keyword, page, pageSize, orderBy, orderDirection)

    const stories = await storyRepository.getAndPaginateStories({ keyword, page, pageSize, orderBy, orderDirection });

    return res.status(200).json({
        message: "OK",
        data: stories
    });
}

export const createStory = (req, res) => {

}