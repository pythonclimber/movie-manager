import { Observable } from "ui/frame";
import { MoviesService } from '../../services/movies-service';
import { SearchResult } from "../../shared/interfaces";
import { SearchResultViewModel } from "./search-result-view-model";

export class SearchViewModel extends Observable {
    private _searchText: string;
    private _movieService: MoviesService;
    private _searchResults: Array<SearchResultViewModel>;
    private _searchError: boolean;
    private _isLoading: boolean;

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

    constructor() {
        super();

        this._movieService = new MoviesService();
        this._searchResults = new Array<SearchResultViewModel>();
    }

    public searchForMovie() {
        if (!this._searchText) {
            this.searchError = true;
            return;
        }
        
        this.searchError = false;

        console.log('searching for ' + this._searchText);
        this._movieService.onlineMovieSearch<any>(this._searchText).then(response => {
            console.log(response.success);
            let searchResults = new Array<SearchResultViewModel>();
            for (let movie of response.movies) {
                let searchResult = <SearchResult>movie;
                searchResults.push(new SearchResultViewModel(movie))
            }
            this._searchResults = searchResults;
            this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'searchResults', value: this.searchResults});
        }).catch(console.log);
    }
}