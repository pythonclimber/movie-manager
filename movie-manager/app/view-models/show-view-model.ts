import { Show } from '../shared/interfaces';
import { ShowService } from '../services/show-service';
import { Observable } from "@nativescript/core";

export class ShowViewModel extends Observable {
    private show: Show;
    private showService: ShowService;

    get Title(): string {
        return this.show.title;
    }

    set Title(value: string) {
        if (value != this.show.title) {
            this.show.title = value;
            this.notifyPropertyChange('Title', value);
        }
    }

    get Year(): string {
        return this.show.year;
    }

    set Year(value: string) {
        if (value != this.show.year) {
            this.show.year = value;
            this.notifyPropertyChange('Year', value);
        }
    }

    get Favorite(): boolean {
        return this.show.favorite;
    }

    set Favorite(value: boolean) {
        if (value != this.show.favorite) {
            this.show.favorite = value;
            this.notifyPropertyChange('Favorite', value);
        }
    }

    get ImdbId(): string {
        return this.show.imdbid;
    }

    set ImdbId(value: string) {
        if (value !== this.show.imdbid) {
            this.show.imdbid = value;
            this.notifyPropertyChange('ImdbId', value);
        }
    }

    get UserId(): string {
        return this.show.userId;
    }

    set UserId(value: string) {
        if (value !== this.show.userId) {
            this.show.userId = value;
            this.notifyPropertyChange('UserId', value);
        }
    }

    get Type(): string {
        return 'Show';
    }

    constructor(show: Show) {
        super();
        this.show = show;
        this.showService = new ShowService();

        this.show.title = this.showService.FormatTitle(this.show.title);
    }

    public ToggleFavorite() {
        this.Favorite = !this.Favorite;
        this.showService.toggleFavorite(this.UserId, this.ImdbId, this.Favorite);
    }

    private GetDetails() {
        
    }
}