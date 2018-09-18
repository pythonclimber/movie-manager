import { Page, NavigatedData } from 'ui/page';
import { FormatPickerViewModel } from '../../view-models/format-picker-view-model';
import { MovieService } from "../../services/movie-service";
import { MovieViewModel } from '../../view-models/movie-view-model';

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;

    let movieViewModel = <MovieViewModel>args.context;

    new MovieService().getFormats().then(formats => {
        page.bindingContext = new FormatPickerViewModel(formats, movieViewModel);
    });
}