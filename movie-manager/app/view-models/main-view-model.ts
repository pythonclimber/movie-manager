import { Observable } from "@nativescript/core";
import { Page } from "@nativescript/core";
import { DisplayPages } from '~/shared/enums';

export class MainViewModel extends Observable {
    private displayPage: string;
    private page: Page;

    get DisplayPage(): string { 
        return this.displayPage;
    }

    set DisplayPage(value: string) {
        if (value !== this.displayPage) {
            this.displayPage = value;
            this.notifyPropertyChange('DisplayPage', value);
        }
    }

    get Page(): Page {
        return this.page;
    }

    set Page(value: Page) {
        this.page = value;
    }

    get DisplayPages(): DisplayPages {
        return DisplayPages;
    }

    constructor() {
        super();

        this.DisplayPage = DisplayPages.MovieListPage;
    }

    public SetDisplayPage(displayPage: string) {
        this.DisplayPage = displayPage;
    }

    // private shows: ShowViewModel[];

    // private showService: ShowService;
    
    // private favoritesOnly: boolean;

    // private filteredShows: ShowViewModel[];
    // private selectedIndex: number;
    

    // private gridMovies: MovieViewModel[][];

    // get FavoritesOnly(): boolean {
    //     return this.favoritesOnly;
    // }

    // set FavoritesOnly(value: boolean) {
    //     if (value !== this.favoritesOnly) {
    //         this.favoritesOnly = value;
    //         this.notifyPropertyChange('FavoritesOnly', value);
    //         this.ToggleViewOption();
    //     }
    // }

    // get SelectedIndex(): number {
    //     return this.selectedIndex;
    // }

    // set SelectedIndex(value: number) {
    //     if (value !== this.selectedIndex) {
    //         this.selectedIndex = value;
    //         this.notifyPropertyChange('SelectedIndex', value);
    //         this.ToggleViewOption();
    //     }
    // }

    // get GridMovies(): MovieViewModel[][] {
    //     return this.gridMovies;
    // }


    // public ToggleViewOption(): void {
    //     if (this.viewMode == ViewMode.Movies) {
    //         this.ToggleMovies();
    //     } else {
    //         this.ToggleShows();
    //     }
    // }

    // public ToggleViewMode(): void {
    //     if (this.viewMode == ViewMode.Movies) {
    //         this.viewMode = ViewMode.Shows;
    //     } else {
    //         this.viewMode = ViewMode.Movies;
    //     }
    //     this.notifyPropertyChange('ViewMode', this.ViewMode);
    //     this.notifyPropertyChange('ViewModeText', this.ViewModeText);
    // }

    // private LoadShows(): void {
    //     this.showService
    //         .getShows<Array<Show>>()
    //         .then(shows => {
    //             let showViewModels = new Array<ShowViewModel>();
    //             for (let show of shows) {
    //                 showViewModels.push(new ShowViewModel(show));
    //             }

    //             this.shows = showViewModels;
    //             this.filteredShows = this.shows.sort(this.SortByTitle);
    //             this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Shows', value: this.filteredShows});
    //         })
    // }

    // private ToggleShows() {
    //     if (this.favoritesOnly) {
    //         this.filteredShows = this.shows.filter(m => m.Favorite);
    //     } else {
    //         this.filteredShows = this.shows;
    //     }
    //     this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'Shows', value: this.filteredShows});
    // }

    // private LoadMovieGrid(movies: MovieViewModel[]): void {
    //     this.gridMovies = [];
    //     while (movies.length >= 3) {
    //         this.gridMovies.push(movies.splice(0, 3));
    //     }

    //     if (movies.length > 0) {
    //         this.gridMovies.push(movies);
    //     }

    //     let movieGrid = <GridLayout>this.Page.getViewById('movie-grid');
    //     for (let i = 0; i < this.gridMovies.length; i++) {
    //         movieGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
    //         let gridRow = new GridLayout();
    //         gridRow.row = i;
    //         let row = this.gridMovies[i];
    //         for (let j = 0; j < row.length; j++) {
    //             gridRow.addColumn(new ItemSpec(1, GridUnitType.STAR));
    //             let imageFrame = new GridLayout();
    //             let image = new Image();
    //             image.src = row[j].ImageSource;
    //             image.height = 162;
    //             image.width = 108;
                
    //             imageFrame.col = j;
    //             imageFrame.padding = 5;
    //             imageFrame.addChild(image);

    //             gridRow.addChild(imageFrame);
    //         }

    //         movieGrid.addChild(gridRow);
    //     }

    //     //this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'GridMovies', value: this.gridMovies});
    //     this.notifyPropertyChange('GridMovies', this.gridMovies);
    // }

    Test() {
        
    }
}
