import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { GestureEventData, EventData, Page, ViewBase, Utils } from "@nativescript/core";
import { DisplayPages } from '~/shared/enums';
import { MainViewModel } from '~/view-models/main-view-model';

let sideDrawer: RadSideDrawer;
let page: Page;

export function actionBarLoaded(args: EventData) {
    page = <Page>(<any>args.object).page;
    sideDrawer = <RadSideDrawer>page.getViewById('side-drawer');
}

export function toggleDrawer(args: GestureEventData) {
    let view = <ViewBase>args.object;

    if (view.android) {
        Utils.ad.dismissSoftInput();
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