import { Observable } from 'data/observable';
import { MovieService } from '../../services/movie-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie, Show } from '../../shared/interfaces';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { ViewMode, ViewOptions, MovieFlow, SortModes } from '../../shared/enums';
import { ShowService } from '../../services/show-service';
import { ShowViewModel } from '../movie-page/show-view-model';
import { GestureEventData } from 'ui/gestures';
import { Label } from 'ui/label';

export class MainViewModel extends Observable {
    private movies: MovieViewModel[];
    private wishlist: MovieViewModel[];
    private shows: ShowViewModel[];
    private movieService: MovieService;
    private showService: ShowService;
    private isLoading: boolean;
    private favoritesOnly: boolean;
    private filteredMovies: MovieViewModel[];
    private filteredShows: ShowViewModel[];
    private selectedIndex: number;
    private viewMode: ViewMode;
    private filterMode: string;
    private displayFilters: boolean;
    private filters: string[];
    private sortMode: string;
    private displaySortModes: boolean;

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
            this.ToggleViewOption();
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

    get FilterMode(): string {
        return this.filterMode;
    }

    set FilterMode(value: string) {
        if (value !== this.filterMode) {
            this.filterMode = value;
            this.notifyPropertyChange('FilterMode', value);
        }
    }

    get DisplayFilters(): boolean {
        return this.displayFilters;
    }

    set DisplayFilters(value: boolean) {
        if (value !== this.displayFilters) {
            this.displayFilters = value;
            this.notifyPropertyChange('DisplayFilters', value);
        }
    }

    get SortMode(): string {
        return this.sortMode;
    }

    set SortMode(value: string) {
        if (value !== this.sortMode) {
            this.sortMode = value;
            this.notifyPropertyChange('SortMode', value);
        }
    }

    get DisplaySortModes(): boolean {
        return this.displaySortModes;
    }

    set DisplaySortModes(value: boolean) {
        if (value !== this.displaySortModes) {
            this.displaySortModes = value;
            this.notifyPropertyChange('DisplaySortModes', value);
        }
    }

    get FilteredMovies(): MovieViewModel[] {
        return this.filteredMovies;
    }

    get Movies(): MovieViewModel[] {
        return this.movies;
    }

    get Shows(): ShowViewModel[] {
        return this.filteredShows;
    }

    get ViewMode(): string {
        return ViewMode[this.viewMode];
    }

    get ViewModeText(): string {
        return this.viewMode == ViewMode.Movies ? ViewMode[ViewMode.Shows] : ViewMode[ViewMode.Movies];
    }

    get Filters(): string[] {
        return this.filters;
    }

    get ViewOptions(): ViewOptions {
        return ViewOptions;
    }

    get SortModes(): SortModes {
        return SortModes;
    }

    constructor() {
        super();
        this.movieService = new MovieService();
        this.movies = new Array<MovieViewModel>();
        this.showService = new ShowService();
        this.shows = new Array<ShowViewModel>();
        this.filters = [
            ViewOptions.All,
            ViewOptions.Favorites,
            ViewOptions.Wishlist
        ];
        this.Init();

        this.isLoading = false;
        this.selectedIndex = 0;
        this.viewMode = ViewMode.Movies;
        this.filterMode = ViewOptions.All;
        this.displayFilters = false;
        this.sortMode = SortModes.Alphabetical;
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

    public ChangeFilter(args: GestureEventData): void {
        var label = <Label>args.object;
        if (label.text != this.filterMode) {
            this.FilterMode = label.text;
            this.FilterMovies();
        }
        this.DisplayFilters = !this.DisplayFilters;
    }

    public ChangeSort(args: GestureEventData): void {
        let label = <Label>args.object;
        if (label.text !== this.sortMode) {
            this.SortMode = label.text;
            this.SortMovies();
        }
        this.DisplaySortModes = !this.DisplaySortModes;
    }

    public LoadMovies(): Promise<void> {
        return this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                let myMovies = movies.filter(m => !m.wishlist).map(m => new MovieViewModel(m, MovieFlow.Collection));
                this.wishlist = movies
                    .filter(m => m.wishlist)
                    .map(m => new MovieViewModel(m, MovieFlow.Collection))
                    .sort(this.SortByTitle.bind(this));
                this.movies = myMovies.sort(this.SortByTitle.bind(this));
                this.FilterMovies();
            }).catch(error => {
                console.log(error);
            });
    }

    public Init(): void {
        this.isLoading = true;
        this.LoadMovies().then(() => {
            this.isLoading = false;
        });
        //this.LoadShows();
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
        let title1 = this.movieService.FormatTitle(item1.Title);
        let title2 = this.movieService.FormatTitle(item2.Title);
        if (title1 < title2)
            return -1;
        else if (title1 > title2) 
            return 1;
        else
            return 0;
    }

    private SortByReverseTitle(item1, item2): number {
        let title1 = this.movieService.FormatTitle(item1.Title);
        let title2 = this.movieService.FormatTitle(item2.Title);
        if (title1 < title2)
            return 1;
        else if (title1 > title2) 
            return -1;
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

    private FilterMovies() {
        this.ToggleMovies();
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
    }

    private ToggleMovies() {
        switch(this.FilterMode) {
            case ViewOptions.All:
                this.filteredMovies = this.movies.filter(m => !m.Wishlist);
                this.SortMovies();
                break;
            case ViewOptions.Favorites:
                this.filteredMovies = this.movies.filter(m => m.Favorite);
                break;
            case ViewOptions.Wishlist:
                this.filteredMovies = this.wishlist;
                break;
            case ViewOptions.FiveStar:
                this.filteredMovies = this.movies.filter(m => m.Rating == 10);
                break;
            case ViewOptions.FourStar: 
                this.filteredMovies = this.movies.filter(m => m.Rating > 7 && m.Rating <= 9);
                break;
            case ViewOptions.ThreeStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 5 && m.Rating <= 7);
                break;
            case ViewOptions.TwoStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 3 && m.Rating <= 5);
                break;
            case ViewOptions.OneStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 1 && m.Rating <= 3);
                break;
            case ViewOptions.Unrated:
                this.filteredMovies = this.movies.filter(m => !m.Rating);
                break;
            default:
                this.filteredMovies = [];
                break;
        }
    }

    private SortMovies(): void {
        switch(this.sortMode) {
            case SortModes.Alphabetical:
                this.filteredMovies = this.filteredMovies.sort(this.SortByTitle.bind(this));
                break;
            case SortModes.Rating:
                //this.filteredMovies = this.movies.sort(this.SortByReverseTitle.bind(this));
                this.SortByRating();
                break;
            default:
                break;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
    }

    private SortByRating() {
        let movieChunks = [];
        let max = 10;
        for (let i = max; i >= 0; i--) {
            if (i > 0) {
                movieChunks.push(this.filteredMovies.filter(m => m.Rating == i));
            } else {
                movieChunks.push(this.filteredMovies.filter(m => !m.Rating));
            }
            movieChunks[10-i].sort(this.SortByTitle.bind(this));
        }

        this.filteredMovies = [];
        movieChunks.forEach(e => {
            this.filteredMovies = this.filteredMovies.concat(e);
        });
    }
}
