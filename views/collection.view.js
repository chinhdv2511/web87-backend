export function CollectionView(collection) {
    return {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        createdAt: collection.createdAt
    };
}

export function CollectionListView(collections) {
    return collections?.map(item => CollectionView(item)) ?? [];
}