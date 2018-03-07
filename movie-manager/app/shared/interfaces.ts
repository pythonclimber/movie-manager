export interface Movie {
    _id: string;
    title: string;
    description: string;
    userId: string;
    director: string;
    imdbid: string;
    year?: number;
    runtime?: string;
    genres?: string;
    writer?: string;
    actors?: string;
    plot?: string;
    poster?: string;
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