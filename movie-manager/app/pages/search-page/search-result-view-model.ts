import { Observable } from "data/observable";
import { SearchResult } from "../../shared/interfaces";
import { ImageSource } from "image-source";
import * as imageService from '../../services/image-service';


export class SearchResultViewModel extends Observable implements SearchResult {
    private _searchResult: SearchResult;
    private _imageSource: ImageSource;

    get Title(): string {
        return this._searchResult.Title;
    }

    set Title(value: string) {
        if (value !== this._searchResult.Title) {
            this._searchResult.Title = value;
            this.notifyPropertyChange('Title', value);
        }
    }

    get Year(): string {
        return this._searchResult.Year;
    }

    set Year(value: string) {
        if (value !== this._searchResult.Year) {
            this._searchResult.Year = value;
            this.notifyPropertyChange('Year', value);
        }
    }
    
    get imdbID(): string {
        return this._searchResult.imdbID;
    }

    set imdbID(value: string) {
        if (value !== this._searchResult.imdbID) {
            this._searchResult.imdbID = value;
            this.notifyPropertyChange('imdbID', value);
        }
    }

    get Type(): string {
        return this._searchResult.Type;
    }

    set Type(value: string) {
        if (value !== this._searchResult.Type) {
            this._searchResult.Type = value;
            this.notifyPropertyChange('Type', value);
        }
    }

    get Poster(): string {
        return this._searchResult.Poster;
    }

    set Poster(value: string) {
        if (value !== this._searchResult.Poster) {
            this._searchResult.Poster = value;
            this.notifyPropertyChange('Poster', value);
        }
    }

    get ImageSource(): ImageSource {
        return this._imageSource;
    }
    
    set ImageSource(value: ImageSource) {
        if (value !== this._imageSource) {
            this._imageSource = value;
            this.notifyPropertyChange('ImageSource', value);
        }
    }

    get UserId(): string {
        return this._searchResult.userId;
    }


    constructor(searchResult: SearchResult) {
        super();

        this._searchResult = searchResult;
        this.ImageSource = new ImageSource();
        if (searchResult.Poster != 'N/A') {
            imageService.getImageFromHttp(searchResult.Poster).then(source => {
                this.ImageSource = source;
            });
        } else {
            this.ImageSource = new ImageSource();
        }
    }
}