import { Observable } from "ui/frame";

export class SearchViewModel extends Observable {
    private _searchText: string;

    get searchText(): string {
        return this._searchText;
    }

    set searchText(value: string) {
        if (value !== this._searchText) {
            this._searchText = value;
            this.notifyPropertyChange('searchText', value);
        }
    }
}