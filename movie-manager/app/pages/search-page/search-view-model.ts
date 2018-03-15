import { Observable } from "ui/frame";
import { MovieService } from '../../services/movies-service';
import { SearchResult, NewSearchResult } from "../../shared/interfaces";
import { SearchResultViewModel } from "./search-result-view-model";
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Page } from 'ui/page';
import { SearchBar } from 'ui/search-bar';

export class SearchViewModel extends Observable {
    private searchText: string;
    private movieService: MovieService;
    private searchResults: Array<SearchResultViewModel>;
    private searchError: boolean;
    private isLoading: boolean;
    
    public myMovies: MovieViewModel[];
    public page: Page;

    get SearchText(): string {
        return this.searchText;
    }

    set SearchText(value: string) {
        if (value !== this.searchText) {
            this.searchText = value;
            this.notifyPropertyChange('SearchText', value);
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

    get SearchResults(): Array<SearchResultViewModel> {
        return this.searchResults;
    }

    get SearchError(): boolean {
        return this.searchError;
    }

    set SearchError(value: boolean) {
        if (value !== this.searchError) {
            this.searchError = value;
            this.notifyPropertyChange('SearchError', value);
        }
    }

    get SearchResultsVisible(): boolean {
        return this.searchResults.length > 0 && !this.isLoading;
    }

    constructor() {
        super();

        this.movieService = new MovieService();
        this.searchResults = [];
    }

    public SearchForMovie() {
        if (!this.searchText) {
            this.SearchError = true;
            return;
        }
        
        this.SearchError = false;
        this.IsLoading = true;

        this.movieService.onlineMovieSearch<any>(this.searchText).then(response => {
            if (response.Response == 'False') {
                if (response.error && response.error.message) {
                    if (response.error.message.startsWith('Movie not found') || response.error.message.startsWith('Too many results')) {
                        this.searchResults = [];
                        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
                    }
                }
            } else {
                let searchResults = new Array<SearchResultViewModel>();
                for (let movie of response.Search) {
                    let searchResult = <NewSearchResult>movie;
                    let myMovie = this.myMovies.find(m => m.ImdbId == searchResult.imdbID);
                    if (myMovie) {
                        searchResult.userId = myMovie.UserId;
                    }
                    searchResults.push(new SearchResultViewModel({
                        title: searchResult.Title,
                        year: searchResult.Year,
                        imdbid: searchResult.imdbID,
                        type: searchResult.Type,
                        poster: searchResult.Poster,
                        userId: searchResult.userId
                    }));
                }
                this.searchResults = searchResults;
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
                this.DismissInput();
            }
            this.IsLoading = false;
        }).catch(error => {
            console.log(error);
            this.IsLoading = false;
        });
    }

    public ClearSearch() {
        this.searchResults = [];
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
        this.DismissInput();
    }

    private DismissInput() {
        let searchBar = <SearchBar>this.page.getViewById('movie-search');
        searchBar.dismissSoftInput();
    }
}