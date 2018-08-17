using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Services;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MovieViewModel : BaseViewModel
    {
        private Movie _movie;
        private bool _isReady;
        private ImageSource _imageSource;
        private readonly IMovieService _movieService;

        public string Title
        {
            get => _movie.Title;
            set
            {
                if (value != _movie.Title)
                {
                    _movie.Title = value;
                    OnPropertyChanged("Title");
                }
            }
        }

        public string Director
        {
            get => _movie.Director;
            set
            {
                if (value != _movie.Director)
                {
                    _movie.Director = value;
                    OnPropertyChanged("Director");
                }
            }
        }

        public string Plot
        {
            get => _movie.Plot;
            set
            {
                if (value != _movie.Plot)
                {
                    _movie.Plot = value;
                    OnPropertyChanged("Plot");
                }
            }
        }

        public bool IsReady
        {
            get => _isReady;
            set
            {
                if (value != _isReady)
                {
                    _isReady = value;
                    OnPropertyChanged("IsReady");
                    OnPropertyChanged("IsLoading");
                }
            }
        }

        public bool IsLoading
        {
            get => !_isReady;

        }

        public bool IsMine
        {
            get => !string.IsNullOrWhiteSpace(_movie.UserId);
        }

        public string UserId
        {
            get => _movie.UserId;
            set
            {
                if (value != _movie.UserId)
                {
                    _movie.UserId = value;
                    OnPropertyChanged("UserId");
                    OnPropertyChanged("IsMine");
                }
            }
        }

        public bool Favorite
        {
            get => _movie.Favorite;
            set
            {
                if (value != _movie.Favorite)
                {
                    _movie.Favorite = value;
                    OnPropertyChanged("Favorite");
                    OnPropertyChanged("NotFavorite");
                }
            }
        }

        public bool NotFavorite
        {
            get => !_movie.Favorite;
        }

        public Movie Movie
        {
            get => _movie;
            set
            {
                if (value != _movie)
                {
                    _movie = value;
                    OnPropertyChanged("Movie");
                    OnPropertyChanged("Title");
                    OnPropertyChanged("Director");
                    OnPropertyChanged("Plot");
                    OnPropertyChanged("Format");
                    OnPropertyChanged("UserId");
                    OnPropertyChanged("IsMine");
                    OnPropertyChanged("ImdbId");
                }
            }
        }

        public ImageSource ImageSource
        {
            get => _imageSource;
            set
            {
                if (value != _imageSource)
                {
                    _imageSource = value;
                    OnPropertyChanged("ImageSource");
                }
            }
        }

        public string Format
        {
            get => _movie.Format;
            set
            {
                if (value != _movie.Format)
                {
                    _movie.Format = value;
                    OnPropertyChanged("Format");
                }
            }
        }

        public string ImdbId
        {
            get => _movie.ImdbId;
            set
            {
                if (value != _movie.ImdbId)
                {
                    _movie.ImdbId = value;
                    OnPropertyChanged("ImdbId");
                }
            }
        }

        public ICommand ToggleFavorite { get; }

        public ICommand SelectMovie { get; }

        public ICommand GoBack { get; }

        public MovieViewModel(Movie movie)
        {
            _isReady = false;
            _movie = movie;
            _movieService = new MovieService();

            FormatTitle();

            ToggleFavorite = new Command(() =>
            {
                Favorite = !Favorite;
                _movieService.ToggleFavorite(UserId, ImdbId, Favorite);
            });

            GoBack = new Command(async () =>
            {
                IsReady = false;
                await Navigation.PopAsync();
            });

            SelectMovie = new Command(SelectMe);
        }

        public async Task LoadMovieDetails()
        {
            IsReady = false;

            var httpClient = new HttpClient();
            var httpResponse =
                await httpClient.GetStringAsync($"https://ohgnarly.herokuapp.com/movie-details/{_movie.ImdbId}");
            var movieResponse = JsonConvert.DeserializeObject<MovieDetailResponse>(httpResponse);
            Movie = movieResponse.Movie;
            ImageSource = ImageSource.FromUri(new Uri(movieResponse.Movie.Poster));

            IsReady = true;
        }

        protected void FormatTitle()
        {
            if (Title.StartsWith("The "))
            {
                Title = Title.Substring(4) + ", The";
            }
            if (Title.StartsWith("A "))
            {
                Title = Title.Substring(2) + ", A";
            }
            if (Title.StartsWith("An "))
            {
                Title = Title.Substring(3) + ", An";
            }
        }

        protected async void SelectMe()
        {
            var moviePage = new MoviePage { BindingContext = this };
            await Navigation.PushAsync(moviePage);
            LoadMovieDetails();
        }
    }
}
