import { Observable } from 'data/observable';
import { MovieService } from '../../services/movies-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie } from '../../shared/interfaces';
import * as favoriteService from '../../services/favorites-service';
import { SegmentedBarItem } from 'ui/segmented-bar';

export class MainViewModel extends Observable {
    private movies: MovieViewModel[];
    private movieService: MovieService;
    private isLoading: boolean;
    private favoritesOnly: boolean;
    private filteredMovies: MovieViewModel[];
    private viewOptions: SegmentedBarItem[];
    private selectedIndex: number;

    get FavoritesOnly(): boolean {
        return this.favoritesOnly;
    }

    set FavoritesOnly(value: boolean) {
        if (value !== this.favoritesOnly) {
            this.favoritesOnly = value;
            this.notifyPropertyChange('FavoritesOnly', value);
            this.ToggleView();
        }
    }

    get SelectedIndex(): number {
        return this.selectedIndex;
    }

    set SelectedIndex(value: number) {
        if (value !== this.selectedIndex) {
            this.selectedIndex = value;
            this.notifyPropertyChange('SelectedIndex', value);
            this.FavoritesOnly = !this.FavoritesOnly;
        }
    }

    get Movies(): MovieViewModel[] {
        return this.filteredMovies;
    }

    get IsLoading(): boolean {
        return this.isLoading;
    }

    set IsLoading(value: boolean) {
        if (value !== this.isLoading) {
            this.isLoading = value;
            this.notifyPropertyChange('IsLoading', value);
        }
    }

    get ViewOptions(): SegmentedBarItem[] {
        return this.viewOptions;
    }

    constructor() {
        super();
        this.movieService = new MovieService();
        this.movies = new Array<MovieViewModel>();
        this.Init();
        this.isLoading = false;
        this.selectedIndex = 0;
        this.viewOptions = this.GetViewOptions();
    }

    public Init(): void {
        this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                let movieViewModels = new Array<MovieViewModel>();
                for (let movie of movies) {
                    let movieModel = new MovieViewModel(movie);
                    let indexInFavorites = favoriteService.findMovieIndexInFavorites(movie._id);
                    if (indexInFavorites >= 0) {
                        movieModel.Favorite = true;
                    }
                    movieViewModels.push(movieModel);
                }
                this.movies = movieViewModels;
                this.filteredMovies = this.movies.sort((m1, m2) => {
                    if (m1.Title < m2.Title)
                        return -1;
                    else if (m1.Title > m2.Title) 
                        return 1;
                    else
                        return 0;
                });
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.movies});
            });
    }

    public ToggleView(): void {
        if (this.favoritesOnly) {
            this.filteredMovies = this.movies.filter(m => m.Favorite);
        } else {
            this.filteredMovies = this.movies;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
    }

    private GetViewOptions(): SegmentedBarItem[] {
        let item1 = new SegmentedBarItem();
        item1.title = 'All Movies';
        let item2 = new SegmentedBarItem();
        item2.title = 'Favorites';

        return [item1, item2];
    }
}
