import { MovieViewModel } from "../pages/movie-page/movie-view-model";
import { Movie } from "../shared/interfaces";
import * as http from 'http';
import * as loginService from './login-service';

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

export class MoviesService {
    private _useHttpService: boolean = true;
    private _apiBaseUrl: string = 'https://ohgnarly.herokuapp.com';
    private _imdbBaseUrl: string = 'https://www.omdbapi.com/?apiKey=1e37ecbf';

    getMovies<T>(): Promise<T> {
        if (this._useHttpService) {
            let user = loginService.getSavedCredentials();
            return this.loadMoviesFromHttp<T>(user.userId);
        } else {
            return this.loadFakeMovies<T>();
        }
    }

    addMovie(movie: MovieViewModel): Promise<Movie> {
        return this.addMovieViaHttp(movie);
    }

    deleteMovie(movie: MovieViewModel): Promise<any> {
        return this.deleteMovieFromHttp(movie.imdbid, movie.userId);
    }

    getMovieDetails<T>(onlineId: string): Promise<T> {
        return this.loadMovieDetailsFromHttp<T>(onlineId);
    }

    onlineMovieSearch<T>(title: string): Promise<T> {
        return this.loadSearchResultsFromHttp<T>(title);
    }

    private loadFakeMovies<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve(movies);
        });
    }

    private loadMoviesFromHttp<T>(userId: string): Promise<T> {
        //return new Promise<T>(() => {});
        let requestParams = {
            url: `${this._apiBaseUrl}/movies/${userId}`,
            method: 'GET'
        }
        return http.getJSON<T>(requestParams);
    }

    private loadMovieDetailsFromHttp<T>(onlineId: string): Promise<T> {
        let requestParams = {
            url: `${this._imdbBaseUrl}&i=${onlineId}&plot=full`,
            method: 'GET'
        };
        return http.getJSON<T>(requestParams);
    }

    private loadSearchResultsFromHttp<T>(title: string): Promise<T> {
        let requestParams = {
            url: `${this._imdbBaseUrl}&s=${encodeURI(title)}&type=movie`,
            method: 'GET'
        };
        return http.getJSON<T>(requestParams);
    }

    private deleteMovieFromHttp(imdbid: string, userId: string): Promise<any> {
        let requestParams = {
            url: `${this._apiBaseUrl}/movie/${userId}/${imdbid}`,
            method: 'DELETE'
        };

        return http.request(requestParams).then(response => {
            return response.content.toJSON();
        });
    }

    private addMovieViaHttp(movie: MovieViewModel): Promise<Movie> {
        let user = loginService.getSavedCredentials();
        let data: Movie = {
            title: movie.title,
            description: '',
            _id: '',
            userId: user.userId,
            director: movie.director,
            imdbid: movie.movie.imdbid
        };

        return http.request({
            url: `${this._apiBaseUrl}/movie`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(response => {
            return response.content.toJSON() as Movie;
        });
    }
}