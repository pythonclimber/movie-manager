export enum ViewMode {
    Movies,
    Shows
}

export class ViewOptions {
    static All: string = 'All Movies';
    static Favorites: string = 'Favorites';
    static Wishlist: string = 'Wishlist';
}

export class MovieFlow {
    static Search: string = 'Search';
    static Collection: string = 'Collection';
}