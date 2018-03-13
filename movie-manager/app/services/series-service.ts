import * as http from 'http';
import * as loginService from './login-service';

export class SeriesService {
    public getSeries<T>(userId: string): Promise<T> {
        return this.getSeriesFromHttp(userId);
    }

    private getSeriesFromHttp<T>(userId: string): Promise<T> {
        let requestParams = {
            url: `https://ohgnarly.herokuapp.com/series/${userId}`,
            method: 'GET'
        };

        return http.getJSON<T>(requestParams);
    }
}