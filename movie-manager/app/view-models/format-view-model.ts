import { Observable } from "@nativescript/core";
import { FormatItem } from '~/shared/interfaces';

export class FormatViewModel extends Observable {
    private formatItem: FormatItem

    get Name(): string {
        return this.formatItem.name;
    }

    set Name(value: string) {
        if (value !== this.formatItem.name) {
            this.formatItem.name = value;
            this.notifyPropertyChange('Name', value);
        }
    }

    get Selected(): boolean {
        return this.formatItem.selected;
    }

    set Selected(value: boolean) {
        if (value !== this.formatItem.selected) {
            this.formatItem.selected = value;
            this.notifyPropertyChange('Selected', value);
        }
    }

    constructor(formatItem: FormatItem) {
        super();

        this.formatItem = formatItem;
    }
}