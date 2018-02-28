export interface Movie {
    _id: string;
    title: string;
    description: string;
    userId: string;
    director: string;
    onlineId: string;
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