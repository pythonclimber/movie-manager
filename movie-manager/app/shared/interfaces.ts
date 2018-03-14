export interface Movie {
    _id: string;
    title: string;
    description: string;
    userId: string;
    director: string;
    imdbid: string;
    favorite: boolean;
    year?: string;
    runtime?: string;
    genres?: string;
    writer?: string;
    actors?: string;
    plot?: string;
    poster?: string;
}

export interface NewMovie {
    Title: string;
    Year: string;
    Rated: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbID: string;
    Runtime: string;
}

export interface FavoriteMovie {
    movieId: string
}

export interface SavedCredentials {
    username: string;
    password: string;
    userId: string;
}

export interface SearchResult {
    title: string;
    year: string;
    imdbid: string;
    type: string;
    poster: string;
    userId?: string;
}

export interface NewSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    userId?: string;
}

export interface Series {
    title: string;
    year: string;
    imdbid: string;
    userId: string;
}

export interface ViewOption {
    title: string;
}