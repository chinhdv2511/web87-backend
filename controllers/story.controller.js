import storyRepository from "../repositories/story.repository.js";
import { StoryListView, StoryView } from "../views/story.view.js";

export const getStories = async (req, res) => {
    let { keyword, page, pageSize, orderBy, orderDirection } = req.query;

    if (!page || page <= 0) page = 1;
    if (!pageSize || pageSize <= 0) pageSize = 15;
    if (!orderBy) orderBy = 'createdAt';
    if (!orderDirection) orderDirection = 'desc';

    const data = await storyRepository.getAndPaginateStories({ keyword, page, pageSize, orderBy, orderDirection });

    return res.status(200).json({
        message: "OK",
        data: {
            ...data,
            stories: StoryListView(data.stories)
        }
    });
}

export const getStory = async (req, res) => {
    const { id } = req.params;

    const story = await storyRepository.getStoryById(id);
    if (!story) {
        return res.status(404).json({
            message: "Story was not found"
        });
    }

    return res.status(200).json({
        message: "OK",
        data: StoryView(story)
    });
}

export const createStory = (req, res) => {

}