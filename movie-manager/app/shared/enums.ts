export enum ViewMode {
    Movies,
    Shows
}

export class ViewOptions {
    static All: string = 'All Movies';
    static Favorites: string = 'Favorites';
    static Wishlist: string = 'Wishlist';
    static FiveStar: string = '5-Star';
    static FourStar: string = '4-Star';
    static ThreeStar: string = '3-Star';
    static TwoStar: string = '2-Star';
    static OneStar: string = '1-Star';
    static Unrated: string = 'No Rating';
}

export class MovieFlow {
    static Search: string = 'Search';
    static Collection: string = 'Collection';
}

export class SortModes {
    static Alphabetical: string = 'A -> Zed'
    static Rating: string = 'Rating'
}