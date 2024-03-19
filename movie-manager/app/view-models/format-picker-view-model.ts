import { Observable } from "@nativescript/core";
import * as navigationModule from '../shared/navigation';
import { MovieViewModel } from "./movie-view-model";
import { MovieService } from "~/services/movie-service";
import { FormatViewModel } from "./format-view-model";
import * as dialogModule from "@nativescript/core";


export class FormatPickerViewModel extends Observable {
    private formats: FormatViewModel[];
    private movie: MovieViewModel;
    private movieService: MovieService;
    private selectedIndex: number;

    get Formats(): FormatViewModel[] {
        return this.formats;
    }

    set Formats(value: FormatViewModel[]) {
        if (value !== this.formats) {
            this.formats = value;
            this.notifyPropertyChange('Formats', value);
        }
    }

    get SelectedIndex(): number {
        return this.selectedIndex;
    }

    set SelectedIndex(value: number) {
        if (value !== this.selectedIndex) {
            this.selectedIndex = value;
            this.notifyPropertyChange('SelectedIndex', value);
        }
    }

    constructor(formats: string[], movie: MovieViewModel) {
        super();
        this.movie = movie;
        this.movieService = new MovieService();
        this.selectedIndex = 0;

        const movieFormats = movie.Format.split('|').map(mf => mf.trim());
        this.formats = formats.map(format => {
            format = format.trim();
            return new FormatViewModel({
                name: format,
                selected: movieFormats.some(mf => mf == format)
            });
        });
    }

    public ChooseFormats(): void {
        const selectedFormats = this.formats.filter(f => f.Selected);
        if (selectedFormats.length === 0) {
            dialogModule.alert('You must select at least one format...');
            return;
        }

        const formatString = selectedFormats.map(sf => sf.Name.trim()).join(' | ');

        if (this.movie.Wishlist) {
            this.movieService.toggleWishlist(this.movie.UserId, this.movie.ImdbId, false, formatString).then(response => {
                this.movie.Wishlist = false;
                navigationModule.navigateToMainPage();
            });
        } else if (!!this.movie.UserId) {
            this.movieService.updateFormats(this.movie.UserId, this.movie.ImdbId, formatString).then(() => {
                navigationModule.backOnePage();
            });
        } else {
            this.movie.Format = formatString;
            this.movieService.addMovie(this.movie).then(response => {
                this.movie.UserId = response.userId;
                this.movie.Wishlist = false;
                this.movie.IsMine = true;
                navigationModule.backOnePage();
            });
        }
    }

    public Cancel(): void {
        navigationModule.backOnePage();
    }
}