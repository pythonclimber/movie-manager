import { Observable } from "data/observable";
import { EventData } from 'ui/text-base';
import * as loginService from '../../services/login-service';
import * as navigationModule from '../../shared/navigation';

export class LoginViewModel extends Observable {
    private _username: string;
    private _password: string;
    private _loginError: boolean;

    get loginError(): boolean {
        return this._loginError;
    }

    set loginError(value: boolean) {
        if (value !== this._loginError) {
            this._loginError = value;
            this.notifyPropertyChange('loginError', value);
        }
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (value !== this._username) {
            this._username = value;
            this.notifyPropertyChange('username', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (value !== this._password) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    public constructor() {
        super();
        this.loginError = false;
        let savedCredentials = loginService.getSavedCredentials();
        if (savedCredentials) {
            this.username = savedCredentials.username;
            this.password = savedCredentials.password;
        }
    }

    processLogin(args: EventData) {
        this.loginError = false;
        loginService.processLogin(this.username, this.password).then(loginResponse => {
            if (loginResponse.success) {
                console.log('login success');
                loginService.addCredentials({username: this.username, password: this.password, userId: loginResponse.userId});
                navigationModule.navigateToMainPage(loginResponse.userId);
            } else {
                this.loginError = true;
                this.password = '';
                this.username = '';
                console.log('login failed');
            }
        });
    }
}