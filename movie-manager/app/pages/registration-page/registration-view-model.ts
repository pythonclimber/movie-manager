import { Observable } from 'data/observable';
import * as navigationModule from '../../shared/navigation';

export class RegistrationViewModel extends Observable {
    constructor() {
        super();
    }

    public GoBack(): void {
        navigationModule.goToLoginPage();
    }
}