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
    wishlist: boolean;
    format: string;
    rating?: number;
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
    wishlist?: boolean;
}

export interface NewSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    userId?: string;
    wishlist?: boolean;
}

export interface Show {
    title: string;
    year: string;
    imdbid: string;
    userId: string;
    favorite: boolean;
}

export interface SearchResponse {
    results: SearchResult[];
    totalResults: number;
    success: boolean;
}

export interface Media {
    Title: string;
    Director: string;
    Year: string;
}

export interface MovieDetailResponse {
    found: boolean;
    movie: Movie;
}

export interface UsernameResponse {
    isAvailable: boolean;
}

export interface User {
    username: string;
    password: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
}

export interface BaseResponse {
    success: boolean;
}

export interface FormatItem {
    name: string;
    selected: boolean;
}