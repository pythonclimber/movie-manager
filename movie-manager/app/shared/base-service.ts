import * as http from 'http';
import * as appSettingsModule from 'application-settings';
import { ImageSource } from 'image-source';

export class BaseService {
    protected apiBaseUrl: string;
    //protected imdbBaseUrl: string;

    constructor() {
        this.apiBaseUrl = 'https://ohgnarly3.herokuapp.com';
        //this.imdbBaseUrl = 'https://www.omdbapi.com/?apiKey=1e37ecbf';
    }

    protected ProcessHttpCall<T>(requestParams: http.HttpRequestOptions): Promise<T> {
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

    public CircularReplacer() {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
    }
}