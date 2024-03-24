import { Observable } from "@nativescript/core";
import * as navigationModule from '../shared/navigation';
import { LoginService } from '../services/login-service';
import * as dialogModule from "@nativescript/core";
import { User } from '../shared/interfaces';

export class RegistrationViewModel extends Observable {
    private loginService: LoginService;

    private isPaused: boolean;
    get IsPaused(): boolean {
        return this.isPaused;
    }
    set IsPaused(value: boolean) {
        if (value !== this.isPaused) {
            this.isPaused = value;
            this.notifyPropertyChange("IsPaused", value);
        }
    }

    private username: string;
    get Username(): string {
        return this.username;
    }
    set Username(value: string) {
        if (value !== this.username) {
            this.username = value;
            this.notifyPropertyChange("Username", value);
        }
    }

    private usernameError: string;
    get UsernameError(): string {
        return this.usernameError;
    }
    set UsernameError(value: string) {
        if (value !== this.usernameError) {
            this.usernameError = value;
            this.notifyPropertyChange("UsernameError", value);
        }
    }

    private password: string;
    get Password(): string {
        return this.password;
    }
    set Password(value: string) {
        if (value !== this.password) {
            this.password = value;
            this.notifyPropertyChange('Password', value);
        }
    }

    private passwordError: string;
    get PasswordError(): string {
        return this.passwordError;
    }
    set PasswordError(value: string) {
        if (value !== this.passwordError) {
            this.passwordError = value;
            this.notifyPropertyChange('PasswordError', value);
        }
    }

    private confirm: string;
    get Confirm(): string {
        return this.confirm;
    }
    set Confirm(value: string) {
        if (value !== this.confirm) {
            this.confirm = value;
            this.notifyPropertyChange('Confirm', value);
        }
    }

    private confirmError: string;
    get ConfirmError(): string {
        return this.confirmError;
    }
    set ConfirmError(value: string) {
        if (value !== this.confirmError) {
            this.confirmError = value;
            this.notifyPropertyChange('ConfirmError', value);
        }
    }

    private emailAddress: string;
    get EmailAddress(): string {
        return this.emailAddress;
    }
    set EmailAddress(value: string) {
        if (value !== this.emailAddress) {
            this.emailAddress = value;
            this.notifyPropertyChange('EmailAddress', value);
        }
    }

    private emailAddressError: string;
    get EmailAddressError(): string {
        return this.emailAddressError;
    }
    set EmailAddressError(value: string) {
        if (value !== this.emailAddressError) {
            this.emailAddressError = value;
            this.notifyPropertyChange('EmailAddressError', value);
        }
    }

    private firstName: string;
    get FirstName(): string {
        return this.firstName;
    }
    set FirstName(value: string) {
        if (value !== this.firstName) {
            this.firstName = value;
            this.notifyPropertyChange('FirstName', value);
        }
    }

    private firstNameError: string;
    get FirstNameError(): string {
        return this.firstNameError;
    }
    set FirstNameError(value: string) {
        if (value !== this.firstNameError) {
            this.firstNameError = value;
            this.notifyPropertyChange('FirstNameError', value);
        }
    }

    private lastName: string;
    get LastName(): string {
        return this.lastName;
    }
    set LastName(value: string) {
        if (value !== this.lastName) {
            this.lastName = value;
            this.notifyPropertyChange('LastName', value);
        }
    }

    private lastNameError: string;
    get LastNameError(): string {
        return this.lastNameError;
    }
    set LastNameError(value: string) {
        if (value !== this.lastNameError) {
            this.lastNameError = value;
            this.notifyPropertyChange('LastNameError', value);
        }
    }

    constructor() {
        super();

        this.loginService = new LoginService();
        this.usernameError = '';
        this.passwordError = '';
        this.confirmError = '';
        this.emailAddressError = ''
    }

    public GoBack(): void {
        navigationModule.goToLoginPage();
    }

    public ValidateUsername() {
        this.IsPaused = true;
        this.CheckUsername().then(() => {
            this.IsPaused = false;
        });
    }

    public ValidatePassword() {
        this.PasswordError = '';
        if (!this.password) {
            this.PasswordError = 'Password is required';
            return;
        }
    }

    public ValidateConfirm() {
        this.ConfirmError = '';
        if (!this.confirm) {
            this.ConfirmError = 'Confirm Password is required.';
            return;
        }

        if (this.password !== this.confirm) {
            this.ConfirmError = 'Passwords do not match';
            return;
        }
    }

    public ValidateEmail() {
        this.IsPaused = true;
        this.CheckEmail().then(() => {
            this.IsPaused = false;
        });
    }

    public ValidateFirstName() {
        if (!this.firstName) {
            this.FirstNameError = 'First name is required.';
            return;
        }

        this.FirstNameError = '';
    }

    public ValidateLastName() {
        if (!this.lastName) {
            this.LastNameError = 'Last name is required.';
            return;
        }

        this.LastNameError = '';
    }

    public SubmitRegistration() {
        this.IsPaused = true;
        this.ValidatePassword();
        this.ValidateConfirm();
        this.ValidateFirstName();
        this.ValidateLastName();

        this.CheckEmail().then(() => {
            this.CheckUsername().then(() => {
                if (this.CanSubmit()) {
                    this.loginService.CreateUser(this.BuildUser()).then(response => {
                        let msg = response.success
                            ? 'Your registration has been submitted. We will review and approve your request. Please allow up to 48 hours for approval.'
                            : 'We are not currently accepting new users.  Please wait 24 hours and try again.';
                            dialogModule.alert(msg).then(() => {
                                navigationModule.goToLoginPage();
                            });
                    });
                } else {
                    dialogModule.alert('Please resolve all registration errors before submitting...');
                }
                this.IsPaused = false;
            });
        });
    }

    private CheckEmail(): Promise<void> {
        this.EmailAddressError = '';

        if (!this.emailAddress) {
            this.EmailAddressError = 'Email address is required.';
            return new Promise((resolve, reject) => { resolve(); });
        }

        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(this.emailAddress)) {
            this.EmailAddressError = 'This is not a valid email address.';
            return new Promise((resolve, reject) => { resolve(); });
        }

        return this.loginService.CheckEmailAddress(this.emailAddress).then(response => {
            if (!response.isAvailable) {
                this.EmailAddressError = 'Email has already been used.'
            }
        });
    }

    private CheckUsername(): Promise<void> {
        this.UsernameError = ''

        if (!this.username) {
            this.UsernameError = 'Username is required.'
            return new Promise<void>((resolve, reject) => { resolve(); });
        }

        return this.loginService.CheckUsername(this.username).then(response => {
            if (!response.isAvailable) {
                this.UsernameError = 'Username is already taken.'
            }
        });
    }

    private CanSubmit(): boolean {
        return this.EmailAddressError.length == 0 &&
               this.UsernameError.length == 0 &&
               this.PasswordError.length == 0 &&
               this.ConfirmError.length == 0 &&
               this.FirstNameError.length == 0 &&
               this.LastNameError.length == 0;
    }

    private BuildUser(): User {
        return {
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress: this.emailAddress
        };
    }
}