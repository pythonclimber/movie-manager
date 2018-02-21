import { MovieViewModel } from "../pages/movie-page/movie-view-model";
import { Movie } from "../shared/interfaces";

export class MoviesService {
    getMovies(): MovieViewModel[] {
        let movies: Movie[] = [
            {
                title: 'The Shawshank Redemption',
                description: 'Drama',
                userId: '123',
                director: 'Frank Darabont',
                favorite: false
            },
            {
                title: 'The Big Lebowski',
                description: 'Drama',
                userId: '123',
                director: 'Joel Cohen',
                favorite: false
            },
            {
                title: 'L.A. Confidential',
                description: 'Drama',
                userId: '123',
                director: 'Curtis Hanson',
                favorite: false
            },
            {
                title: 'The Royal Tennenbaums',
                description: 'Drama',
                userId: '123',
                director: 'Wes Anderson',
                favorite: false
            }
        ];

        
        return movies.map(m => new MovieViewModel(m));
    }
}