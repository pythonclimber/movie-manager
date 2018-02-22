import { Observable } from 'data/observable';
import { MoviesService } from '../../services/movies-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie } from '../../shared/interfaces';
import * as favoriteService from '../../services/favorites-service';

export class MainPageViewModel extends Observable {
    public movies: MovieViewModel[];
    public movieService: MoviesService;

    constructor() {
        super();
        this.movieService = new MoviesService();
        this.movies = new Array<MovieViewModel>();
        this.init();
    }

    init(): void {
        this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                for (let movie of movies) {
                    let movieModel = new MovieViewModel(movie);
                    let indexInFavorites = favoriteService.findMovieIndexInFavorites(movie._id);
                    if (indexInFavorites >= 0) {
                        movieModel.favorite = true;
                    }
                    this.movies.push(movieModel);
                }
            })
    }
}
