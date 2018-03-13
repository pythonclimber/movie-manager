import * as httpModule from 'http';
import * as appSettingsModule from 'application-settings';
import { SavedCredentials } from '../shared/interfaces';

const CREDENTIALS_KEY: string = 'CREDENTIALS';
let credentials: Array<SavedCredentials>;

try {
    credentials = <Array<SavedCredentials>>JSON.parse(appSettingsModule.getString(CREDENTIALS_KEY));
} catch (error) {
    credentials = new Array<SavedCredentials>();
}

export function processLogin(username: string, password: string) {
    const data = {
        userName: username,
        password: password
    };
    return httpModule.request({
        url: 'https://ohgnarly.herokuapp.com/login',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(data)
    }).then(response => {
        return response.content.toJSON();
    }, error => {
        console.log('An error has occurred: ' + error);
    }).catch(error => {
        console.log('An error has occurred: ' + error);
    });
}

export function addCredentials(newCredentials: SavedCredentials) {
    if (credentials.length > 0) {
        credentials[0] = newCredentials;
    } else {
        credentials.push(newCredentials);
    }
    persistCredentials();
}

export function getSavedCredentials(): SavedCredentials {
    if (credentials.length > 0) {
        return credentials[0];
    } else {
        return undefined;
    }
}

export function persistCredentials() {
    let jsonString = JSON.stringify(credentials);
    appSettingsModule.setString(CREDENTIALS_KEY, jsonString);
}