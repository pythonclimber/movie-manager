import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { MainPageViewModel } from './main-view-model';
import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { MovieViewModel } from '../movie-page/movie-view-model';

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = new MainPageViewModel();
}

export function toggleFavorite(args: GestureEventData) {
    let movie = <MovieViewModel>args.view.bindingContext;
    movie.toggleFavorite();
}