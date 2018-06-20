import { Observable } from "data/observable";


export class FormatViewModel extends Observable {
    private formats: string[];

    get Formats(): string[] {
        return this.formats;
    }

    set Formats(value: string[]) {
        if (value !== this.formats) {
            this.formats = value;
            this.notifyPropertyChange('Formats', value);
        }
    }

    constructor(formats: string[]) {
        super();
        this.formats = formats;
    }
}