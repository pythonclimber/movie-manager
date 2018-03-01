import { Observable } from 'data/observable';
import { MoviesService } from '../../services/movies-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie } from '../../shared/interfaces';
import * as favoriteService from '../../services/favorites-service';

export class MainPageViewModel extends Observable {
    private _movies: MovieViewModel[];
    public movieService: MoviesService;

    get movies(): MovieViewModel[] {
        return this._movies;
    }

    get searchText(): string {
        return 'search';
    }

    constructor() {
        super();
        this.movieService = new MoviesService();
        this._movies = new Array<MovieViewModel>();
        console.log('initializing');
        this.init();
    }

    init(): void {
        this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                let movieViewModels = new Array<MovieViewModel>();
                for (let movie of movies) {
                    let movieModel = new MovieViewModel(movie);
                    let indexInFavorites = favoriteService.findMovieIndexInFavorites(movie._id);
                    if (indexInFavorites >= 0) {
                        movieModel.favorite = true;
                    }
                    movieViewModels.push(movieModel);
                }
                this._movies = movieViewModels;
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'movies', value: this.movies});
            });
    }
}
