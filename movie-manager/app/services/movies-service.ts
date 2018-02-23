import { MovieViewModel } from "../pages/movie-page/movie-view-model";
import { Movie } from "../shared/interfaces";
import * as http from 'http';

let movies: any = [
    {
        _id: '1',
        title: 'The Shawshank Redemption',
        description: 'Drama',
        userId: '123',
        director: 'Frank Darabont',
        __v: 0
    },
    {
        _id: '2',
        title: 'The Big Lebowski',
        description: 'Drama',
        userId: '123',
        director: 'Joel Cohen'
    },
    {
        _id: '3',
        title: 'L.A. Confidential',
        description: 'Drama',
        userId: '123',
        director: 'Curtis Hanson'
    },
    {
        _id: '4',
        title: 'The Royal Tennenbaums',
        description: 'Drama',
        userId: '123',
        director: 'Wes Anderson'
    }
];

export class MoviesService {
    private _useHttpService: boolean = false;

    getMovies<T>(): Promise<T> {
        if (this._useHttpService) {
            return this.loadMoviesFromHttp<T>();    
        } else {
            return this.loadFakeMovies<T>();
        }
    }

    addMovie(movie: MovieViewModel) {
        let data: Movie = {
            title: movie.title,
            description: movie.description,
            _id: movie._id,
            userId: movie.userId,
            director: movie.director
        };

        console.log('Adding movie');
        http.request({
            url: 'https://ohgnarly.herokuapp.com/movie',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(response => {
            console.log(response.content.toJSON());
        }, e => {
            console.log('An error occurred: ' + e)
        }).catch(response => {
            console.log('An error occurred: ' + response);
        });
    }

    private loadFakeMovies<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve(movies);
        });
    }

    private loadMoviesFromHttp<T>(): Promise<T> {
        //return new Promise<T>(() => {});
        let requestParams = {
            url: 'http://ohgnarly.herokuapp.com/movies/58cb3e444c8d5f6b7cdd71f6',
            method: 'GET'
        }
        return http.getJSON<T>(requestParams);
    }
}