import { Observable, EventData } from 'data/observable';
import { MovieService } from '../../services/movie-service';
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Movie, Show } from '../../shared/interfaces';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { ViewMode, ViewOptions, MovieFlow } from '../../shared/enums';
import { ShowService } from '../../services/show-service';
import { ShowViewModel } from '../movie-page/show-view-model';
import { GestureEventData } from 'ui/gestures';
import { Label } from 'ui/label';

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
    private filterMode: string;
    private displayFilters: boolean;

    public Icon: string;

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

    get FilteredMovies(): MovieViewModel[] {
        return this.filteredMovies;
    }

    get Movies(): MovieViewModel[] {
        return this.movies;
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
        this.Icon = String.fromCharCode(0xea43);
        this.movieService = new MovieService();
        this.movies = new Array<MovieViewModel>();
        this.showService = new ShowService();
        this.shows = new Array<ShowViewModel>();
        this.Init();

        this.isLoading = false;
        this.selectedIndex = 0;
        this.viewOptions = this.GetViewOptions();
        this.viewMode = ViewMode.Movies;
        this.filterMode = ViewOptions.All;
        this.displayFilters = false;
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
            this.ToggleMovies();
        }
        this.DisplayFilters = !this.DisplayFilters;
    }

    public LoadMovies(): Promise<void> {
        return this.movieService
            .getMovies<Array<Movie>>()
            .then(movies => {
                let movieViewModels = new Array<MovieViewModel>();
                for (let movie of movies) {
                    let movieViewModel = new MovieViewModel(movie, MovieFlow.Collection);
                    movieViewModels.push(movieViewModel);
                }
                this.movies = movieViewModels.sort(this.SortByTitle);
                this.ToggleMovies();
            }).catch(error => {
                console.log(error);
            });
    }

    private GetViewOptions(): SegmentedBarItem[] {
        let item1 = new SegmentedBarItem();
        item1.title = 'All';
        let item2 = new SegmentedBarItem();
        item2.title = 'Favorites';
        let item3 = new SegmentedBarItem();
        item3.title = 'Wishlist';

        return [item1, item2, item3];
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
        switch(this.FilterMode) {
            case ViewOptions.All:
                this.filteredMovies = this.movies.filter(m => !m.Wishlist);
                break;
            case ViewOptions.Favorites:
                this.filteredMovies = this.movies.filter(m => m.Favorite);
                break;
            case ViewOptions.Wishlist:
                this.filteredMovies = this.movies.filter(m => m.Wishlist);
                break;
            default:
                this.filteredMovies = [];
                break;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Movies', value: this.filteredMovies});
    }
}
