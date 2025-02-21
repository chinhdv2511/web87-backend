export function CollectionView(collection) {
    return {
        ...collection
    };
}

export function CollectionListView(collections) {
    return collections?.map(item => CollectionView(item)) ?? [];
}