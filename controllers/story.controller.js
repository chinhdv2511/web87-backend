import storyRepository from "../repositories/story.repository.js";
import { StoryListView, StoryView } from "../views/story.view.js";

export const getStories = async (req, res) => {
    let { keyword, page, pageSize, orderBy, orderDirection } = req.query;

    if (!page || page <= 0) page = 1;
    if (!pageSize || pageSize <= 0) pageSize = 15;
    if (!orderBy) orderBy = 'createdAt';
    if (!orderDirection) orderDirection = 'desc';

    const paginationResult = await storyRepository.getAndPaginateStories(
        { keyword, page, pageSize, orderBy, orderDirection },
        ['user', 'collection']
    );

    return res.ok({
        ...paginationResult,
        stories: StoryListView(paginationResult.stories)
    });
}

export const getStory = async (req, res) => {
    const { id } = req.params;

    const story = await storyRepository.getStoryById(id);
    (await story.populate(['user', 'collection']));

    if (!story) {
        return res.notFound("", "Story was not found");
    }

    return res.ok(StoryView(story));
}

export const createStory = async (req, res) => {
    const currentUserId = req.currentUserId;
    const { title, content, collectionId, images } = req.body;

    const newStory = await storyRepository.createStory({ title, content, collectionId, images, userId: currentUserId });
    return res.ok(StoryView(newStory));
}

export const updateStory = async (req, res) => {
    const currentUserId = req.currentUserId;

    const { id } = req.params;
    const { title, content, collectionId, images } = req.body;

    const story = await storyRepository.getStoryById(id);
    if (!story) {
        return res.notFound("The story was not found", "Not found");
    } else if (story.userId.toString() != currentUserId) {
        return res.forbidden("You are not allowed to update this story");
    }

    story.title = title;
    story.collectionId = collectionId;
    story.content = content;
    story.images = images;
    await storyRepository.updateStory(story);

    return res.ok(StoryView(story));
}


export const uploadFile = (req, res) => {

    const file = req.file;
    console.log(file);

    const publicDomain = process.env.PUBLIC_DOMAIN;

    return res.ok({
        name: file.filename,
        path: file.path.replaceAll('\\', '/'),
        size: file.size
    });
}