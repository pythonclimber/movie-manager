import * as httpModule from 'http';
import * as appSettingsModule from 'application-settings';
import { SavedCredentials } from '../shared/interfaces';
import { BaseService } from '../shared/base-service';

const CREDENTIALS_KEY: string = 'CREDENTIALS';

export class LoginService extends BaseService {
    private credentials: Array<SavedCredentials>;

    constructor() {
        super();

        try {
            this.credentials = this.GetAppSetting<SavedCredentials[]>(CREDENTIALS_KEY);
        } catch (error) {
            this.credentials = new Array<SavedCredentials>();;
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

    public WriteObjectToServer(value: any): Promise<any> {
        const data = {
            logObject: value
        }

        let requestParams = {
            url: `${this.apiBaseUrl}/log`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            content: JSON.stringify(data, this.CircularReplacer)
        };

        return this.ProcessHttpCall(requestParams);
    }
}