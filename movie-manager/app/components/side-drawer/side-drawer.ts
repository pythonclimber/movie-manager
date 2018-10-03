import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { MainViewModel } from '~/view-models/main-view-model';
import { ViewMode } from '~/shared/enums';
import * as navigationModule from '../../shared/navigation';
import { EventData, Page } from 'ui/page';
import * as utilsModule from 'utils/utils';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

let id: string;
let sideDrawer: RadSideDrawer;

export function onSideDrawerLoaded(args: EventData) {
    let root = <any>args.object;
    let page = root.page;

    id = root.id;
    sideDrawer = page.getViewById('side-drawer');
}

export function searchTap(args: GestureEventData) {
    if (id.startsWith('search')) {
        sideDrawer.toggleDrawerState();
        return;
    }

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
    if (id.startsWith('main')) {
        sideDrawer.toggleDrawerState();
        return;
    }

    let page = <Page>args.object;
    if (page.android) {
        utilsModule.ad.dismissSoftInput();
    }

    setTimeout(() => {
        navigationModule.navigateToMainPage();
    }, 300);
}