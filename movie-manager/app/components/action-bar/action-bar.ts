import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { GestureEventData } from 'ui/gestures'
import { EventData } from 'data/observable';
import { Page, ViewBase } from 'ui/page';
import * as utilsModule from 'utils/utils';
import * as navigationModule from '../../shared/navigation';
import { ViewMode, DisplayPages } from '~/shared/enums';
import { MainViewModel } from '~/view-models/main-view-model';

let sideDrawer: RadSideDrawer;
let page: Page;

export function actionBarLoaded(args: EventData) {
    page = <Page>(<any>args.object).page;
    sideDrawer = page.getViewById('side-drawer');
}

export function toggleDrawer(args: GestureEventData) {
    let view = <ViewBase>args.object;

    if (view.android) {
        utilsModule.ad.dismissSoftInput();
    }

    if (!sideDrawer) {
        console.log('exiting');
        return;
    }
    sideDrawer.toggleDrawerState();
}

export function searchTap(args: GestureEventData) {
    let mainViewModel = <MainViewModel>page.bindingContext;
    mainViewModel.SetDisplayPage(DisplayPages.SearchPage);
}