import { Observable } from 'data/observable';
import { MoviesService } from '../../services/movies-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie } from '../../shared/interfaces';
import * as favoriteService from '../../services/favorites-service';

export class MainViewModel extends Observable {
    private _movies: MovieViewModel[];
    private _movieService: MoviesService;
    private _isLoading: boolean;
    private _favoritesOnly: boolean;
    private _filteredMovies: MovieViewModel[];

    get favoritesOnly(): boolean {
        return this._favoritesOnly;
    }

    set favoritesOnly(value: boolean) {
        if (value !== this._favoritesOnly) {
            this._favoritesOnly = value;
            this.notifyPropertyChange('favoritesOnly', value);
            this.toggleView();
        }
    }

    get movies(): MovieViewModel[] {
        return this._filteredMovies;
    }

    get searchText(): string {
        return 'search';
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (value !== this._isLoading) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    constructor() {
        super();
        this._movieService = new MoviesService();
        this._movies = new Array<MovieViewModel>();
        this.init();
        this._isLoading = false;
    }

    init(): void {
        this._movieService
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
                this._filteredMovies = this._movies.sort((m1, m2) => {
                    if (m1.title < m2.title)
                        return -1;
                    else if (m1.title > m2.title) 
                        return 1;
                    else
                        return 0;
                });
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'movies', value: this.movies});
            });
    }

    toggleView(): void {
        if (this.favoritesOnly) {
            this._filteredMovies = this._movies.filter(m => m.favorite);
        } else {
            this._filteredMovies = this._movies;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'movies', value: this.movies});
    }
}
