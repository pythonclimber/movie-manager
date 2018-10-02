import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { GestureEventData } from 'ui/gestures'
import { EventData } from 'data/observable';
import { Page, ViewBase } from 'ui/page';
import * as utilsModule from 'utils/utils';

let sideDrawer: RadSideDrawer

export function actionBarLoaded(args: EventData) {
    let page = <Page>(<any>args.object).page;
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