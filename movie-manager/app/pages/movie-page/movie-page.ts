import { GestureEventData } from 'ui/gestures';
import * as navigationModule from '../../shared/navigation';

export function backTap(args: GestureEventData) {
    console.log('back tapping');
    navigationModule.backOnePage();
}