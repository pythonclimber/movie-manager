import { Observable } from "ui/frame";
import { MoviesService } from '../../services/movies-service';
import { SearchResult, NewSearchResult } from "../../shared/interfaces";
import { SearchResultViewModel } from "./search-result-view-model";
import { MovieViewModel } from '../movie-page/movie-view-model';

export class SearchViewModel extends Observable {
    private _searchText: string;
    private _movieService: MoviesService;
    private _searchResults: Array<SearchResultViewModel>;
    private _searchError: boolean;
    private _isLoading: boolean;
    
    public myMovies: MovieViewModel[];

    get searchText(): string {
        return this._searchText;
    }

    set searchText(value: string) {
        if (value !== this._searchText) {
            this._searchText = value;
            this.notifyPropertyChange('searchText', value);
        }
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

    get searchResults(): Array<SearchResultViewModel> {
        return this._searchResults;
    }

    get searchError(): boolean {
        return this._searchError;
    }

    set searchError(value: boolean) {
        if (value !== this._searchError) {
            this._searchError = value;
            this.notifyPropertyChange('searchError', value);
        }
    }

    get searchResultsVisible(): boolean {
        return this.searchResults.length > 0 && !this.isLoading;
    }

    constructor() {
        super();

        this._movieService = new MoviesService();
        this._searchResults = [];
    }

    public searchForMovie() {
        if (!this._searchText) {
            this.searchError = true;
            return;
        }
        
        this.searchError = false;
        this.isLoading = true;
        

        this._movieService.onlineMovieSearch<any>(this._searchText).then(response => {
            if (response.Response == 'False') {
                if (response.error && response.error.message) {
                    if (response.error.message.startsWith('Movie not found') || response.error.message.startsWith('Too many results')) {
                        this._searchResults = [];
                        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'searchResults', value: this.searchResults});
                    }
                }
            } else {
                let searchResults = new Array<SearchResultViewModel>();
                for (let movie of response.Search) {
                    let searchResult = <NewSearchResult>movie;
                    let myMovie = this.myMovies.find(m => m.imdbid == searchResult.imdbID);
                    if (myMovie) {
                        searchResult.userId = myMovie.userId;
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
                this._searchResults = searchResults;
                this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'searchResults', value: this.searchResults});
            }
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
            this.isLoading = false;
        });
    }
}