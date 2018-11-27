import * as http from 'http';
import * as appSettingsModule from 'application-settings';
import { ImageSource } from 'image-source';

export class BaseService {
    protected apiBaseUrl: string;
    protected apiKey: string;
    protected sender: string;
    //protected imdbBaseUrl: string;

    constructor() {
        this.apiBaseUrl = 'https://ohgnarly3.herokuapp.com';
        //this.apiBaseUrl = 'http://10.0.2.2:3000';
        this.sender = 'ohGnarlyMovies';
        this.apiKey = 'QlULR6lMQ2gZqZdVplXcn6wyIrNTkGcJPHWsU+gFSFQ=';
    }

    protected ProcessHttpCall<T>(requestParams: http.HttpRequestOptions): Promise<T> {
        if (!requestParams.headers){
            requestParams.headers = {};
        }
        requestParams.headers['api-key'] = this.apiKey;
        requestParams.headers['sender'] = this.sender;
        return http.request(requestParams).then(response => {
            return response.content.toJSON() as T;
        });
    }

    protected GetImage(url: string): Promise<ImageSource> {
        return http.getImage(url);
    }

    protected PersistAppSetting(key: string, value: any): void {
        let jsonString = JSON.stringify(value);
        appSettingsModule.setString(key, jsonString);
    }

    protected GetAppSetting<T>(key: string): T {
        let jsonString = appSettingsModule.getString(key);
        let value = <T>JSON.parse(jsonString);
        return value;
    }

    public FormatTitle(title: string): string {
        if (title.startsWith('The ')) {
            return title.substr(4) + ', The'
        } else if (title.startsWith('A ')) {
            return title.substr(2) + ', A'
        } else if (title.startsWith('An ')) {
            return title.substr(3) + ', An'
        }
        return title;
    }
}