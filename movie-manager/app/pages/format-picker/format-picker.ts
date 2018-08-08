import { Page, NavigatedData } from 'ui/page';
import { FormatViewModel } from './format-view-model';
import { MovieService } from "../../services/movie-service";
import { MovieViewModel } from '../movie-page/movie-view-model';

export function navigatingTo(args: NavigatedData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;

    let movieViewModel = <MovieViewModel>args.context;

    new MovieService().getFormats().then(formats => {
        page.bindingContext = new FormatViewModel(formats, movieViewModel);
    });
}