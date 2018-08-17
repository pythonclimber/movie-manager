using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Services;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        private List<MovieViewModel> _movies;
        private string _userId;
        private MovieService _movieService;

        public ICommand SearchForMovie { get; }

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

        public MainViewModel(string userId)
        {
            _userId = userId;
            _movieService = new MovieService();

            SearchForMovie = new Command(() =>
            {
                var searchViewModel = new SearchViewModel {Navigation = Navigation};
                var searchPage = new SearchPage {BindingContext = searchViewModel};
                Navigation.PushAsync(searchPage);
            });
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
            var movieViewModels = movies.Select(m => new MovieViewModel(m) {Navigation = Navigation}).ToList();

            // ReSharper disable once StringCompareToIsCultureSpecific
            movieViewModels.Sort((m1, m2) => m1.Title.CompareTo(m2.Title));

            return movieViewModels;
        }
    }
}
