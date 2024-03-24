import { Observable } from "@nativescript/core";
import { EventData } from "@nativescript/core";
import { LoginService } from '~/services/login-service';
import * as navigationModule from '../shared/navigation';

export class LoginViewModel extends Observable {
    private username: string;
    private password: string;
    private loginError: boolean;
    private isLoading: boolean;
    private loginService: LoginService;

    get LoginError(): boolean {
        return this.loginError;
    }

    set LoginError(value: boolean) {
        if (value !== this.loginError) {
            this.loginError = value;
            this.notifyPropertyChange('LoginError', value);
        }
    }

    get Username(): string {
        return this.username;
    }

    set Username(value: string) {
        if (value !== this.username) {
            this.username = value;
            this.notifyPropertyChange('Username', value);
        }
    }

    get Password(): string {
        return this.password;
    }

    set Password(value: string) {
        if (value !== this.password) {
            this.password = value;
            this.notifyPropertyChange('Password', value);
        }
    }

    get IsLoading(): boolean {
        return this.isLoading;
    }

    set IsLoading(value: boolean) {
        if (value !== this.isLoading) {
            this.isLoading = value;
            this.notifyPropertyChange('IsLoading', value);
        }
    }

    public constructor() {
        super();
        this.loginError = false;
        this.loginService = new LoginService();
        let savedCredentials = this.loginService.GetSavedCredentials();
        if (savedCredentials) {
            this.username = savedCredentials.username;
            this.password = savedCredentials.password;
        }
        this.isLoading = false;
    }

    public ProcessLogin(args: EventData) {
        this.LoginError = false;
        this.IsLoading = true;
        this.loginService.ProcessLogin(this.username, this.password).then(loginResponse => {
            if (loginResponse.success) {
                this.loginService.AddCredentials({username: this.username, password: this.password, userId: loginResponse.userId});
                navigationModule.navigateToMainPage();
            } else {
                this.loginError = true;
                this.Password = '';
                this.Username = '';
                this.IsLoading = false;
            }
        });
    }

    public ShowRegistration(): void {
        navigationModule.goToRegistrationPage();
    }
}