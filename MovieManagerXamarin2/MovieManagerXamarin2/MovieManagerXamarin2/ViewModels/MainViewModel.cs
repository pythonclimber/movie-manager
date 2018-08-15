using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Services;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        private List<MovieViewModel> _movies;
        private MovieViewModel _selectedMovie;
        private string _userId;
        private MovieService _movieService;

        public INavigation Navigation { get; set; }

        public List<MovieViewModel> Movies
        {
            get => _movies;
            set
            {
                if (value != _movies)
                {
                    _movies = value;
                    OnPropertyChanged("Movies");
                }
            }
        }

        public MovieViewModel SelectedMovie
        {
            get => _selectedMovie;
            set
            {
                var sameValue = _selectedMovie?.Equals(value) ?? false;
                if (!sameValue)
                {
                    _selectedMovie = value;
                    //OnPropertyChanged("SelectedMovie");
                    if (_selectedMovie != null)
                    {
                        try
                        {
                            var moviePage = new MoviePage {BindingContext = _selectedMovie };
                            _selectedMovie.LoadMovieDetails();
                            Navigation.PushAsync(new NavigationPage(moviePage));
                            _selectedMovie = null;
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }
                    }
                }
            }
        }

        public MainViewModel(string userId)
        {
            _userId = userId;
            _movieService = new MovieService();
        }

        public void InitializeAsync()
        {
#pragma warning disable 4014
            LoadMovies();
#pragma warning restore 4014
        }

        protected async Task LoadMovies()
        {
            Movies = PrepareMovies(await _movieService.GetMovies(_userId));
        }

        protected List<MovieViewModel> PrepareMovies(List<Movie> movies)
        {
            var movieViewModels = movies.Select(m => new MovieViewModel(m)).ToList();

            // ReSharper disable once StringCompareToIsCultureSpecific
            movieViewModels.Sort((m1, m2) => m1.Title.CompareTo(m2.Title));

            return movieViewModels;
        }
    }
}
