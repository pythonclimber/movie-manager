import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { MainViewModel } from '~/view-models/main-view-model';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { ViewMode } from '~/shared/enums';
import * as navigationModule from '../../shared/navigation';
import { EventData, Page } from 'ui/page';
import * as utilsModule from 'utils/utils';

let sideDrawer: RadSideDrawer

export function onSideDrawerLoaded(args: EventData) {
    let page = <Page>(<any>args.object).page;
    sideDrawer = page.getViewById('side-drawer');
}

export function searchTap(args: GestureEventData) {
    let mainViewModel = <MainViewModel>args.view.bindingContext;

    if (mainViewModel.ViewMode == ViewMode[ViewMode.Movies]) {
        setTimeout(() => {
            navigationModule.navigateToSearchPage(ViewMode.Movies);
        }, 300);
    } else {
        navigationModule.navigateToSearchPage(ViewMode.Shows);
    }
}

export function goToMovies(args: GestureEventData) {
    let page = <Page>args.object;

    if (page.android) {
        utilsModule.ad.dismissSoftInput();
    }

    setTimeout(() => {
        navigationModule.navigateToMainPage();
    }, 300);
}