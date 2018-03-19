import { Observable } from "ui/frame";
import { MovieService } from '../../services/movie-service';
import { SearchResult, NewSearchResult, SearchResponse } from "../../shared/interfaces";
import { SearchResultViewModel } from "./search-result-view-model";
import { MovieViewModel } from '../movie-page/movie-view-model';
import { Page } from 'ui/page';
import { SearchBar } from 'ui/search-bar';
import { ViewMode } from "../../shared/enums";
import { ShowViewModel } from "../movie-page/show-view-model";
import { ShowService } from "../../services/show-service";

export class SearchViewModel extends Observable {
    private searchText: string;
    private movieService: MovieService;
    private showService: ShowService;
    private searchResults: Array<SearchResultViewModel>;
    private searchError: boolean;
    private isLoading: boolean;
    private totalResults: number;
    
    public myMovies: MovieViewModel[];
    public page: Page;
    public searchMode: ViewMode;
    public myShows: ShowViewModel[];

    get TotalResults(): number {
        return this.totalResults;
    }

    set TotalResults(value: number) {
        if (value !== this.totalResults) {
            this.totalResults = value;
            this.notifyPropertyChange('TotalResults', value);
        }
    }

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
        this.showService = new ShowService();
        this.searchResults = [];
    }

    public DoSearch() {
        if (!this.searchText) {
            this.SearchError = true;
            return;
        }
        
        this.SearchError = false;
        this.IsLoading = true;
        this.searchResults = new Array<SearchResultViewModel>();

        if (this.searchMode == ViewMode.Movies) {
            this.SearchForMovie();
        } else {
            this.SearchForShow();
        }
    }

    public ClearSearch() {
        this.searchResults = [];
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
    }

    public GetNextPage() {
        if (this.searchResults.length % 10 != 0 || this.searchResults.length == this.totalResults) {
            return;
        }

        let currentPage = this.searchResults.length / 10;
        if (this.searchMode == ViewMode.Movies) {
            this.SearchForMovie(++currentPage);
        } else {
            this.SearchForShow(++currentPage);
        }
    }

    private DismissInput() {
        let searchBar = <SearchBar>this.page.getViewById('movie-search');
        searchBar.dismissSoftInput();
    }

    private SearchForMovie(resultsPage: number = 1) {
        this.movieService
            .onlineMovieSearch<any>(this.searchText, resultsPage)
            .then(this.HandleSearchResponse.bind(this))
            .catch(error => {
                console.log(error);
                this.IsLoading = false;
            });
    }

    private SearchForShow(resultsPage: number = 1) {
        this.showService
            .onlineShowSearch(this.searchText, resultsPage)
            .then(this.HandleSearchResponse.bind(this))
            .catch(error => {
                console.log(error);
                this.isLoading = false;
            })
    }

    private HandleSearchResponse<T>(response: SearchResponse) {
        if (response.Response == 'False') {
            this.searchResults = [];
            this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
        } else {
            let searchResults = new Array<SearchResultViewModel>();
            for (let result of response.Search) {
                let searchResult = <NewSearchResult>result;
                if (this.searchMode == ViewMode.Movies) {
                    let myMovie = this.myMovies.find(m => m.ImdbId == searchResult.imdbID);
                    if (myMovie) {
                        searchResult.userId = myMovie.UserId;
                    }
                } else {
                    let myShow = this.myShows.find(s => s.ImdbId == searchResult.imdbID);
                    if (myShow) {
                        searchResult.userId = myShow.UserId;
                    }
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
            this.TotalResults = response.totalResults;
            this.searchResults = this.searchResults.concat(searchResults);
            this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'SearchResults', value: this.searchResults});
            this.DismissInput();
        }
        this.IsLoading = false;
    }
}