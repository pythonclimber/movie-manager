import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { MovieViewModel } from "~/view-models/movie-view-model";
import * as navigationModule from "~/shared/navigation";
import { NavigatedData, View } from "tns-core-modules/ui/page/page";
import { MovieListViewModel } from "~/view-models/movie-list-view-model";
import { ViewOptions } from "~/shared/enums";

let movieListViewModel: MovieListViewModel;

export function movieListLoaded(args: NavigatedData) {
    let root = <View>args.object;
    if (!movieListViewModel) {
        movieListViewModel = new MovieListViewModel(ViewOptions.All);
    }

    root.bindingContext = movieListViewModel;
    root.bindingContext.Init();
}

export function refreshCollection(args) {
    let pullToRefresh = args.object;
    let movieListViewModel = <MovieListViewModel>pullToRefresh.bindingContext;


    movieListViewModel.LoadMovies().then(() => {
        pullToRefresh.refreshing = false;
    });
}

export function selectMovie(args: ItemEventData) {
    let movie = <MovieViewModel>args.view.bindingContext;
    navigationModule.navigateToMovie(movie);
}