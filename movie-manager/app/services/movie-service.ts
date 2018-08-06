import { MovieViewModel } from "../pages/movie-page/movie-view-model";
import { Movie } from "../shared/interfaces";
import * as http from 'http';
import { LoginService } from './login-service';
import { BaseService } from '../shared/base-service';

let movies: any = [
    {
        _id: '1',
        title: 'The Shawshank Redemption',
        description: 'Drama',
        userId: '123',
        director: 'Frank Darabont',
        __v: 0,
        onlineId: 'tt0111161'
    },
    {
        _id: '2',
        title: 'The Big Lebowski',
        description: 'Drama',
        userId: '123',
        director: 'Joel Cohen',
        onlineId: 'tt0118715'
    },
    {
        _id: '3',
        title: 'L.A. Confidential',
        description: 'Drama',
        userId: '123',
        director: 'Curtis Hanson',
        onlineId: 'tt0119488'
    },
    {
        _id: '4',
        title: 'The Royal Tennenbaums',
        description: 'Drama',
        userId: '123',
        director: 'Wes Anderson',
        onlineId: 'tt0265666'
    }
];

export class MovieService extends BaseService {
    private useHttpService: boolean = true;
    private loginService: LoginService;

    constructor() {
        super();
        this.loginService = new LoginService();
    }

    getMovies<T>(): Promise<T> {
        if (this.useHttpService) {
            let user = this.loginService.GetSavedCredentials();
            let requestParams = {
                url: `${this.apiBaseUrl}/movies/${user.userId}`,
                method: 'GET'
            }
            return this.ProcessHttpCall<T>(requestParams);
        } else {
            return new Promise<T>((resolve, reject) => {
                resolve(movies);
            });
        }
    }

    addMovie(movie: MovieViewModel): Promise<Movie> {
        let user = this.loginService.GetSavedCredentials();
        let data: Movie = {
            title: movie.Title,
            description: '',
            _id: '',
            userId: user.userId,
            director: movie.Director,
            imdbid: movie.ImdbId,
            favorite: false,
            wishlist: movie.Wishlist,
            format: 'Blu-ray'
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/movie`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        };

        return this.ProcessHttpCall<Movie>(requestParams);
    }

    deleteMovie(movie: MovieViewModel): Promise<any> {
        let requestParams = {
            url: `${this.apiBaseUrl}/movie/${movie.UserId}/${movie.ImdbId}`,
            method: 'DELETE'
        };

        return this.ProcessHttpCall<any>(requestParams);
    }

    getMovieDetails<T>(onlineId: string): Promise<T> {
        let requestParams = {
            url: `${this.apiBaseUrl}/movie-details/${onlineId}`,
            method: 'GET'
        };

        return this.ProcessHttpCall<T>(requestParams);
    }

    onlineMovieSearch<T>(title: string, page: number = 1): Promise<T> {
        let requestParams = {
            url: encodeURI(`${this.apiBaseUrl}/movie-search/${title}/${page}`),
            method: 'GET'
        };
        return this.ProcessHttpCall<T>(requestParams);
    }

    toggleFavorite(userId: string, imdbid: string, favorite: boolean) {
        let data = {
            userId: userId,
            imdbid: imdbid,
            update: {favorite: favorite}
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/movie`,
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        };

        return this.ProcessHttpCall<any>(requestParams)
    }

    toggleWishlist(userId: string, imdbid: string, wishlist: boolean) {
        let data = {
            userId: userId,
            imdbid: imdbid,
            update: {wishlist: wishlist}
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/movie`,
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        };

        return this.ProcessHttpCall<any>(requestParams);
    }

    updateMovies() {
        this.getMovies<Movie[]>().then(movies => {
            for (let movie of movies) {
                let data = {
                    userId: movie.userId,
                    imdbid: movie.imdbid,
                    update: {format: 'Blu-ray'}
                };

                let request = {
                    url: `${this.apiBaseUrl}/movie`,
                    method: 'PATCH',
                    headers: {"Content-Type": "application/json"},
                    content: JSON.stringify(data)
                };

                this.ProcessHttpCall<any>(request);
            }
        });
    }

    getFormats(): Promise<string[]> {
        let request = {
            url: `${this.apiBaseUrl}/movie-formats`,
            method: 'GET'
        }

        return this.ProcessHttpCall<string[]>(request);
    }
}