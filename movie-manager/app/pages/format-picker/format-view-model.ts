import { Observable } from "data/observable";
import * as navigationModule from '../../shared/navigation';
import { MovieViewModel } from "../movie-page/movie-view-model";
import { MovieService } from "../../services/movie-service";


export class FormatViewModel extends Observable {
    private formats: string[];
    private movie: MovieViewModel;
    private movieService: MovieService;
    private selectedIndex: number;

    get Formats(): string[] {
        return this.formats;
    }

    set Formats(value: string[]) {
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
        this.formats = formats;
        this.movie = movie;
        this.movieService = new MovieService();
        this.selectedIndex = 0;

        console.log(this.selectedIndex);
    }

    public ChooseFormat(): void {
        const selectedFormat = this.formats[this.selectedIndex];
        if (this.movie.Wishlist) {
            this.movieService.toggleWishlist(this.movie.UserId, this.movie.ImdbId, false, selectedFormat).then(response => {
                this.movie.Wishlist = false;
                navigationModule.navigateToMainPage();
            });
        } else {
            this.movie.Format = selectedFormat;
            this.movieService.addMovie(this.movie).then(response => {
                this.movie.UserId = response.userId;
                this.movie.Wishlist = false;
                navigationModule.backOnePage();
            });
        }
    }

    public Cancel(): void {
        navigationModule.backOnePage();
    }
}