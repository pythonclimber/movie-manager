import { Observable } from 'data/observable';
import { MoviesService } from '../../services/movies-service';
import { MovieViewModel } from '../movie-page/movie-view-model';

export class MainPageViewModel extends Observable {

    public movies: MovieViewModel[];

    constructor() {
        super();

        // Initialize default values.
        this.movies = new MoviesService().getMovies();
    }
}
