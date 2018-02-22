export interface Movie {
    _id: string;
    title: string;
    description: string;
    userId: string;
    director: string;
}

export interface FavoriteMovie {
    movieId: string
}