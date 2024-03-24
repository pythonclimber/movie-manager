import { ItemEventData, NavigatedData, View } from "@nativescript/core";
import { MovieViewModel } from "~/view-models/movie-view-model";
import * as navigationModule from "~/shared/navigation";
import { MovieListViewModel } from "~/view-models/movie-list-view-model";
import { ViewOptions } from "~/shared/enums";

let movieListViewModel: MovieListViewModel;

export function movieListLoaded(args: NavigatedData) {
    let root = <View>args.object;
    if (!movieListViewModel) {
        movieListViewModel = new MovieListViewModel(ViewOptions.All);
    }

    movieListViewModel.Init();
    root.bindingContext = movieListViewModel;
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