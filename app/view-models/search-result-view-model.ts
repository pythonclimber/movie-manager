import { Observable } from "@nativescript/core";
import { SearchResult } from "../shared/interfaces";
import { ImageSource } from "@nativescript/core";
import * as imageService from '../services/image-service';


export class SearchResultViewModel extends Observable {
    private searchResult: SearchResult;
    private imageSource: ImageSource;

    public IsSearchResult: boolean = true;

    get Title(): string {
        return this.searchResult.title;
    }

    set Title(value: string) {
        if (value !== this.searchResult.title) {
            this.searchResult.title = value;
            this.notifyPropertyChange('Title', value);
        }
    }

    get Year(): string {
        return this.searchResult.year;
    }

    set Year(value: string) {
        if (value !== this.searchResult.year) {
            this.searchResult.year = value;
            this.notifyPropertyChange('Year', value);
        }
    }
    
    get ImdbId(): string {
        return this.searchResult.imdbid;
    }

    set ImdbId(value: string) {
        if (value !== this.searchResult.imdbid) {
            this.searchResult.imdbid = value;
            this.notifyPropertyChange('ImdbId', value);
        }
    }

    get Type(): string {
        return this.searchResult.type;
    }

    set Type(value: string) {
        if (value !== this.searchResult.type) {
            this.searchResult.type = value;
            this.notifyPropertyChange('Type', value);
        }
    }

    get Poster(): string {
        return this.searchResult.poster;
    }

    set Poster(value: string) {
        if (value !== this.searchResult.poster) {
            this.searchResult.poster = value;
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

    constructor(searchResult: SearchResult) {
        super();

        this.searchResult = searchResult;
        this.ImageSource = new ImageSource();
        if (searchResult.poster && searchResult.poster.startsWith('http')) {
            imageService.getImageFromHttp(searchResult.poster).then(source => {
                this.ImageSource = source;
            });
        } else {
            this.ImageSource = new ImageSource();
        }
    }
}