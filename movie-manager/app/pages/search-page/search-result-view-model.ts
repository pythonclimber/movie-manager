import { Observable } from "data/observable";
import { SearchResult } from "../../shared/interfaces";
import { ImageSource } from "image-source";
import * as imageService from '../../services/image-service';


export class SearchResultViewModel extends Observable implements SearchResult {
    private _searchResult: SearchResult;
    private _imageSource: ImageSource;

    get title(): string {
        return this._searchResult.title;
    }

    set title(value: string) {
        if (value !== this._searchResult.title) {
            this._searchResult.title = value;
            this.notifyPropertyChange('title', value);
        }
    }

    get year(): string {
        return this._searchResult.year;
    }

    set year(value: string) {
        if (value !== this._searchResult.year) {
            this._searchResult.year = value;
            this.notifyPropertyChange('year', value);
        }
    }
    
    get imdbid(): string {
        return this._searchResult.imdbid;
    }

    set imdbid(value: string) {
        if (value !== this._searchResult.imdbid) {
            this._searchResult.imdbid = value;
            this.notifyPropertyChange('imdbid', value);
        }
    }

    get type(): string {
        return this._searchResult.type;
    }

    set type(value: string) {
        if (value !== this._searchResult.type) {
            this._searchResult.type = value;
            this.notifyPropertyChange('type', value);
        }
    }

    get poster(): string {
        return this._searchResult.poster;
    }

    set poster(value: string) {
        if (value !== this._searchResult.poster) {
            this._searchResult.poster = value;
            this.notifyPropertyChange('poster', value);
        }
    }

    get imageSource(): ImageSource {
        return this._imageSource;
    }
    
    set imageSource(value: ImageSource) {
        if (value !== this._imageSource) {
            this._imageSource = value;
            this.notifyPropertyChange('imageSource', value);
        }
    }

    constructor(searchResult: SearchResult) {
        super();

        this._searchResult = searchResult;
        this.imageSource = new ImageSource();
        imageService.getImageFromHttp(searchResult.poster).then(source => {
            this.imageSource = source;
        });
    }
}