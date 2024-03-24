import { LoginService } from './login-service';
import { BaseService } from './base-service';

export class ShowService extends BaseService { 
    private loginService: LoginService;

    constructor() {
        super();
        this.loginService = new LoginService();
    }
    public getShows<T>(): Promise<T> {
        let user = this.loginService.GetSavedCredentials();

        let requestParams = {
            url: `${this.apiBaseUrl}/shows/${user.userId}`,
            method: 'GET'
        };

        return this.ProcessHttpCall<T>(requestParams);
    }

    public onlineShowSearch<T>(title: string, page: number): Promise<T> {
        let requestParams = {
            url: `${this.apiBaseUrl}/show-search/${title}/${page}`,
            method: 'GET'
        };

        return this.ProcessHttpCall<T>(requestParams);
    }

    public toggleFavorite(userId: string, imdbid: string, favorite: boolean) {
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

        return this.ProcessHttpCall<any>(requestParams);
    }
}