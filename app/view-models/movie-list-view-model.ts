import { Observable } from "@nativescript/core";
import { ViewOptions, SortModes, MovieFlow, FilterOptions } from "~/shared/enums";
import { GestureEventData } from "@nativescript/core";
import { Label } from "@nativescript/core";
import { MovieViewModel } from "~/view-models/movie-view-model";
import { MovieService } from "~/services/movie-service";
import { Movie } from "~/shared/interfaces";

export class MovieListViewModel extends Observable {
    private filterMode: string;
    private displaySortModes: boolean;
    private displayFilters: boolean;
    private filteredMovies: MovieViewModel[];
    private movies: MovieViewModel[];
    private wishlist: MovieViewModel[];
    private sortMode: string;
    private movieService: MovieService;
    private viewMode: string;
    private isLoading: boolean;

    get FilterMode(): string {
        return this.filterMode;
    }

    set FilterMode(value: string) {
        if (value !== this.filterMode) {
            this.filterMode = value;
            this.notifyPropertyChange('FilterMode', value);
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

    get IsLoading(): boolean {
        return this.isLoading;
    }

    set IsLoading(value: boolean) {
        if (value !== this.isLoading) {
            this.isLoading = value;
            this.notifyPropertyChange('IsLoading', value);
        }
    }

    get ViewMode(): string {
        return this.viewMode;
    }

    set ViewMode(value: string) {
        if (value !== this.viewMode) {
            this.viewMode = value;
            this.notifyPropertyChange('ViewMode', value);
        }
    }

    get FilteredMovies(): MovieViewModel[] {
        return this.filteredMovies;
    }

    get FilterOptions(): FilterOptions {
        return FilterOptions;
    }

    get SortModes(): SortModes {
        return SortModes;
    }

    get ViewOptions(): ViewOptions {
        return ViewOptions;
    }

    constructor(filterMode: string = undefined) {
        super();

        this.movieService = new MovieService();
        this.movies = new Array<MovieViewModel>();
        this.wishlist = new Array<MovieViewModel>();

        this.isLoading = false;
        this.viewMode = ViewOptions.All;
        this.filterMode = filterMode || FilterOptions.All;
        this.displayFilters = false;
        this.sortMode = SortModes.Alphabetical;

        this.Init();
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

    public SetViewMode(viewMode: string) {
        this.ViewMode = viewMode;
        this.FilterMovies();
    }

    public LoadMovies(): Promise<void> {
        return this.movieService
            .getMovies<Movie[]>()
            .then(movies => {
                this.wishlist = this.wishlist.filter(w => movies.some(m => m.imdbid == w.ImdbId && m.wishlist));
                this.wishlist = movies
                    .filter(m => m.wishlist && this.wishlist.every(mvm => mvm.ImdbId !== m.imdbid))
                    .map(m => new MovieViewModel(m, MovieFlow.Collection))
                    .concat(this.wishlist)
                    .sort(this.SortByTitle.bind(this));
                this.movies = this.movies.filter(mm => movies.some(m => m.imdbid == mm.ImdbId && !m.wishlist));
                this.movies = movies
                    .filter(m => !m.wishlist && this.movies.every(mvm => mvm.ImdbId !== m.imdbid))
                    .map(m => new MovieViewModel(m, MovieFlow.Collection))
                    .concat(this.movies.map(this.ReloadExistingMovie))
                    .sort(this.SortByTitle.bind(this));
                this.FilterMovies();
            }).catch(error => {
                console.error(error);
            });
    }

    public Init(): void {
        this.IsLoading = true;
        this.LoadMovies().then(() => {
            this.IsLoading = false;
        });
    }

    private FilterMovies() {
        if (this.ViewMode == ViewOptions.All) {
            this.ToggleMovies();
        } else {
            this.filteredMovies = this.wishlist;
        }
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'FilteredMovies', value: this.filteredMovies});
    }

    private ToggleMovies() {
        switch(this.FilterMode) {
            case FilterOptions.All:
                this.filteredMovies = this.movies;
                //this.LoadMovieGrid(this.movies.slice(0));
                this.SortMovies();
                break;
            case FilterOptions.FiveStar:
                this.filteredMovies = this.movies.filter(m => m.Rating == 10);
                break;
            case FilterOptions.FourStar: 
                this.filteredMovies = this.movies.filter(m => m.Rating > 7 && m.Rating <= 9);
                break;
            case FilterOptions.ThreeStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 5 && m.Rating <= 7);
                break;
            case FilterOptions.TwoStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 3 && m.Rating <= 5);
                break;
            case FilterOptions.OneStar:
                this.filteredMovies = this.movies.filter(m => m.Rating > 1 && m.Rating <= 3);
                break;
            case FilterOptions.Unrated:
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
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'FilteredMovies', value: this.filteredMovies});
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

    private ReloadExistingMovie(movie: MovieViewModel): MovieViewModel {
        movie.GetLocalDetails();
        return movie;
    }
}