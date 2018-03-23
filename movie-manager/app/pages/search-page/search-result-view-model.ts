import { Observable } from "data/observable";
import { NewSearchResult } from "../../shared/interfaces";
import { ImageSource } from "image-source";
import * as imageService from '../../services/image-service';


export class SearchResultViewModel extends Observable {
    private searchResult: NewSearchResult;
    private imageSource: ImageSource;

    get Title(): string {
        return this.searchResult.Title;
    }

    set Title(value: string) {
        if (value !== this.searchResult.Title) {
            this.searchResult.Title = value;
            this.notifyPropertyChange('Title', value);
        }
    }

    get Year(): string {
        return this.searchResult.Year;
    }

    set Year(value: string) {
        if (value !== this.searchResult.Year) {
            this.searchResult.Year = value;
            this.notifyPropertyChange('Year', value);
        }
    }
    
    get ImdbId(): string {
        return this.searchResult.imdbID;
    }

    set ImdbId(value: string) {
        if (value !== this.searchResult.imdbID) {
            this.searchResult.imdbID = value;
            this.notifyPropertyChange('ImdbId', value);
        }
    }

    get Type(): string {
        return this.searchResult.Type;
    }

    set Type(value: string) {
        if (value !== this.searchResult.Type) {
            this.searchResult.Type = value;
            this.notifyPropertyChange('Type', value);
        }
    }

    get Poster(): string {
        return this.searchResult.Poster;
    }

    set Poster(value: string) {
        if (value !== this.searchResult.Poster) {
            this.searchResult.Poster = value;
            this.notifyPropertyChange('Poster', value);
        }
    }

    get ImageSource(): ImageSource {
        return this.imageSource;
    }
    
    set ImageSource(value: ImageSource) {
        if (value !== this.imageSource) {
            this.imageSource = value;
            this.notifyPropertyChange('ImageSource', value);
        }
    }

    get UserId(): string {
        return this.searchResult.userId;
    }

    get Wishlist(): boolean {
        return this.searchResult.wishlist;
    }

    constructor(searchResult: NewSearchResult) {
        super();

        this.searchResult = searchResult;
        this.ImageSource = new ImageSource();
        if (searchResult.Poster && searchResult.Poster.startsWith('http')) {
            imageService.getImageFromHttp(searchResult.Poster).then(source => {
                this.ImageSource = source;
            });
        } else {
            this.ImageSource = new ImageSource();
        }
    }
}