using System;
using System.Net.Http;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MovieViewModel : BaseViewModel
    {
        private Movie _movie;
        private bool _isReady;
        private ImageSource _imageSource;

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
                }
            }
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

        public MovieViewModel(Movie movie)
        {
            _isReady = false;
            _movie = movie;

            FormatTitle();
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
    }
}
