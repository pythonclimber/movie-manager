import { Observable } from 'data/observable';
import { MovieService } from '../../services/movie-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie, Show } from '../../shared/interfaces';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { ViewMode } from '../../shared/enums';
import { ShowService } from '../../services/show-service';
import { ShowViewModel } from '../movie-page/show-view-model';

export class MainViewModel extends Observable {
    private movies: MovieViewModel[];
    private shows: ShowViewModel[];
    private movieService: MovieService;
    private showService: ShowService;
    private isLoading: boolean;
    private favoritesOnly: boolean;
    private filteredMovies: MovieViewModel[];
    private filteredShows: ShowViewModel[];
    private viewOptions: SegmentedBarItem[];
    private selectedIndex: number;
    private viewMode: ViewMode;

    get FavoritesOnly(): boolean {
        return this.favoritesOnly;
    }

    set FavoritesOnly(value: boolean) {
        if (value !== this.favoritesOnly) {
            this.favoritesOnly = value;
            this.notifyPropertyChange('FavoritesOnly', value);
            this.ToggleViewOption();
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

    get IsLoading(): boolean {
        return this.isLoading;
    }

    set IsLoading(value: boolean) {
        if (value !== this.isLoading) {
            this.isLoading = value;
            this.notifyPropertyChange('IsLoading', value);
        }
    }

    get Movies(): MovieViewModel[] {
        return this.filteredMovies;
    }

    get Shows(): ShowViewModel[] {
        return this.filteredShows;
    }

    get ViewOptions(): SegmentedBarItem[] {
        return this.viewOptions;
    }

    get ViewMode(): string {
        return ViewMode[this.viewMode];
    }

    get ViewModeText(): string {
        return this.viewMode == ViewMode.Movies ? ViewMode[ViewMode.Shows] : ViewMode[ViewMode.Movies];
    }

    constructor() {
        super();
        this.movieService = new MovieService();
        this.movies = new Array<MovieViewModel>();
        this.showService = new ShowService();
        this.shows = new Array<ShowViewModel>();
        this.Init();

        this.isLoading = false;
        this.selectedIndex = 0;
        this.viewOptions = this.GetViewOptions();
        this.viewMode = ViewMode.Movies;
    }

    public ToggleViewOption(): void {
        if (this.viewMode == ViewMode.Movies) {
            this.ToggleMovies();
        } else {
            this.ToggleShows();
        }
    }

    public ToggleViewMode(): void {
        if (this.viewMode == ViewMode.Movies) {
            this.viewMode = ViewMode.Shows;
        } else {
            this.viewMode = ViewMode.Movies;
        }
        this.notifyPropertyChange('ViewMode', this.ViewMode);
        this.notifyPropertyChange('ViewModeText', this.ViewModeText);
    }

    private GetViewOptions(): SegmentedBarItem[] {
        let item1 = new SegmentedBarItem();
        item1.title = 'All Movies';
        let item2 = new SegmentedBarItem();
        item2.title = 'Favorites';

        return [item1, item2];
    }

    private Init(): void {
        this.LoadMovies();
        this.LoadShows();
    }

    private LoadMovies(): void {
        this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                let movieViewModels = new Array<MovieViewModel>();
                for (let movie of movies) {
                    movieViewModels.push(new MovieViewModel(movie));
                }
                this.movies = movieViewModels;
                this.filteredMovies = this.movies.sort(this.SortByTitle);
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
            });
    }

    private LoadShows(): void {
        this.showService
            .getShows<Array<Show>>()
            .then(shows => {
                let showViewModels = new Array<ShowViewModel>();
                for (let show of shows) {
                    showViewModels.push(new ShowViewModel(show));
                }

                this.shows = showViewModels;
                this.filteredShows = this.shows.sort(this.SortByTitle);
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Shows', value: this.filteredShows});
            })
    }

    private SortByTitle(item1, item2): number {
        if (item1.Title < item2.Title)
            return -1;
        else if (item1.Title > item2.Title) 
            return 1;
        else
            return 0;
    }

    private ToggleShows() {
        if (this.favoritesOnly) {
            this.filteredShows = this.shows.filter(m => m.Favorite);
        } else {
            this.filteredShows = this.shows;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Shows', value: this.filteredShows});
    }

    private ToggleMovies() {
        if (this.favoritesOnly) {
            this.filteredMovies = this.movies.filter(m => m.Favorite);
        } else {
            this.filteredMovies = this.movies;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
    }
}
