import { Observable } from "@nativescript/core";
import * as navigationModule from '../shared/navigation';
import { MovieViewModel } from './movie-view-model';
import { MovieService } from '~/services/movie-service';

export class RatingViewModel extends Observable {
    private movie: MovieViewModel;
    private rating: number;
    private movieService: MovieService;

    get Rating(): number {
        return this.rating;
    }

    set Rating(value: number) {
        if (value !== this.rating) {
            this.rating = value;
            this.notifyPropertyChange('Rating', value);
        }
    }

    get Title() {
        return this.movie.Title;
    }

    constructor(movie: MovieViewModel) {
        super();

        this.movie = movie;
        this.rating = movie.Rating;

        this.movieService = new MovieService();
    }

    public SaveRating(): void {
        const movieRating = this.rating > 9.9 ? Math.round(this.rating) : Math.floor(this.rating);
        this.movie.Rating = movieRating;
        this.movieService
            .updateRating(this.movie.UserId, this.movie.ImdbId, movieRating)
            .then(() => { navigationModule.backOnePage(); });
    }

    public Cancel(): void {
        navigationModule.backOnePage();
    }
}