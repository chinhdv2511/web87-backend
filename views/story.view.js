export const StoryView = function (story) {
    const dto = {
        id: story.id,
        title: story.title,
        collectionId: story.collectionId,
        content: story.content,
        viewCount: story.viewCount,
        userId: story.userId,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
        images: story.images,
    };

    if (story.user) {
        dto.userFullName = story.user.fullName;
    }

    if (story.collection) {
        dto.collectionTitle = story.collection.title;
    }

    return dto;
}

export const StoryListView = function (stories) {
    return stories.map(story => StoryView(story));
}