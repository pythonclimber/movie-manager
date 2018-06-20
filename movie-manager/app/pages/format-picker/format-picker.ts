import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { FormatViewModel } from './format-view-model';
import { MovieService } from "../../services/movie-service";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.actionBarHidden = true;
    new MovieService().getFormats().then(formats => {
        page.bindingContext = new FormatViewModel(formats);
    });
}