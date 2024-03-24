import {EventData} from "@nativescript/core";
import {MovieViewModel} from "~/view-models/movie-view-model";

export function movieRowLoaded(args: EventData) {
    const root = (<any>args.object);
    if (root.showImage) {
        const viewModel = <MovieViewModel>root.bindingContext;
        viewModel.ShowImage = !!root.showImage;
    }
}