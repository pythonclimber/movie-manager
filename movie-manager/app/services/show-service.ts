import * as http from 'http';
import * as loginService from './login-service';
import { ShowViewModel } from '../pages/movie-page/show-view-model';

export class ShowService { 
    private imdbBaseUrl: string = 'https://www.omdbapi.com/?apiKey=1e37ecbf';
    private apiBaseUrl: string = 'https://ohgnarly.herokuapp.com';
    
    public getShows<T>(): Promise<T> {
        let user = loginService.getSavedCredentials();
        return this.getShowsFromHttp<T>(user.userId);
    }

    public onlineShowSearch<T>(title: string, page: number): Promise<T> {
        return this.loadSearchResultsFromHttp<T>(title, page);
    }

    public toggleFavorite(userId: string, imdbid: string, favorite: boolean) {
        return this.updateShowViaHttp(userId, imdbid, favorite);
    }

    private getShowsFromHttp<T>(userId: string): Promise<T> {
        let requestParams = {
            url: `${this.apiBaseUrl}/shows/${userId}`,
            method: 'GET'
        };

        return http.getJSON<T>(requestParams);
    }

    private loadSearchResultsFromHttp<T>(title: string, page: number): Promise<T> {
        let requestParams = {
            url: `${this.imdbBaseUrl}&s=${encodeURI(title)}&type=series&page=${page}`,
            method: 'GET'
        };
        return http.getJSON<T>(requestParams);
    }

    private updateShowViaHttp(userId: string, imdbid: string, favorite: boolean): Promise<any> {
        let data = {
            userId: userId,
            imdbid: imdbid,
            favorite: favorite
        };

        let requestParams = {
            url: `${this.apiBaseUrl}/show`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        };

        return http.request(requestParams);
    }
}