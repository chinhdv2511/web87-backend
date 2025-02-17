export const StoryView = function (story) {
    return {
        ...story,
        collectionTitle: story.collectionId.title,
        collectionId: story.collectionId._id,
        userId: story.userId._id,
        userFullName: story.userId.fullName
    };
}

export const StoryListView = function (stories) {
    console.log(stories);
    return stories.map(story => StoryView(story));
}