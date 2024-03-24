import { SavedCredentials, UsernameResponse, BaseResponse, User } from '~/shared/interfaces';
import { BaseService } from './base-service';

const CREDENTIALS_KEY: string = 'CREDENTIALS';

export class LoginService extends BaseService {
    private credentials: Array<SavedCredentials>;

    constructor() {
        super();

        try {
            this.credentials = this.GetAppSetting<SavedCredentials[]>(CREDENTIALS_KEY);
        } catch (error) {
            this.credentials = new Array<SavedCredentials>();
        }
    }

    ProcessLogin(userName: string, password: string): Promise<any> {
        const data = {
            userName: userName,
            password: password
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/login`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        };

        return this.ProcessHttpCall<any>(requestParams);
    }

    public GetSavedCredentials(): SavedCredentials {
        if (this.credentials.length > 0) {
            return this.credentials[0];
        } else {
            return undefined;
        }
    }

    public AddCredentials(newCredentials: SavedCredentials): void {
        if (this.credentials.length > 0) {
            this.credentials[0] = newCredentials;
        } else {
            this.credentials.push(newCredentials);
        }
        this.PersistAppSetting(CREDENTIALS_KEY, this.credentials);
    }

    public CheckUsername(username: string): Promise<UsernameResponse> {
        let data = {
            username: username
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/check-username`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }

        return this.ProcessHttpCall<UsernameResponse>(requestParams);
    }

    public CheckEmailAddress(emailAddress: string): Promise<UsernameResponse> {
        let data = {
            emailAddress: emailAddress
        }

        let requestParams = {
            url: `${this.apiBaseUrl}/check-email`,
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }

        return this.ProcessHttpCall<UsernameResponse>(requestParams);
    }

    public CreateUser(user: User): Promise<BaseResponse> {
        let data = user;

        let requestParams = {
            url: `${this.apiBaseUrl}/create-user`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            content: JSON.stringify(data)
        }

        return this.ProcessHttpCall<BaseResponse>(requestParams);
    }
}