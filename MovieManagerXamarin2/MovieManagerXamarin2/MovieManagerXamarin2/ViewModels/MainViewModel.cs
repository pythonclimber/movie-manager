using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.Services;
using MovieManagerXamarin2.Shared;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        private List<MovieViewModel> _movies;
        private string _userId;
        private MovieService _movieService;
        private string _filter;
        private bool _displayFilters;
        private FontAttributes _allMoviesFont;
        private FontAttributes _favoritesFont;
        private FontAttributes _wishlistFont;
        private List<MovieViewModel> _allMovies;

        #region Bound Properties

        public ICommand SearchForMovie { get; }

        public ICommand ChangeFilter { get; }

        public ICommand SetNewFilter { get; }

        public string Filter
        {
            get => _filter;
            set => SetProperty(ref _filter, value, nameof(Filter));
        }

        public bool DisplayFilters
        {
            get => _displayFilters;
            set => SetProperty(ref _displayFilters, value, nameof(DisplayFilters));
        }

        public FontAttributes AllMoviesFont
        {
            get => _allMoviesFont;
            set
            {
                if (SetProperty(ref _allMoviesFont, value, nameof(AllMoviesFont)) && value == FontAttributes.Bold)
                {
                    OnFontAttributeChange(nameof(AllMoviesFont));
                }
            }
        }

        public FontAttributes FavoritesFont
        {
            get => _favoritesFont;
            set
            {
                if (SetProperty(ref _favoritesFont, value, nameof(FavoritesFont)) && value == FontAttributes.Bold)
                {
                    OnFontAttributeChange(nameof(FavoritesFont));
                }
            }
        }

        public FontAttributes WishlistFont
        {
            get => _wishlistFont;
            set
            {
                if (SetProperty(ref _wishlistFont, value, nameof(WishlistFont)) && value == FontAttributes.Bold)
                {
                    OnFontAttributeChange(nameof(WishlistFont));
                }
            }
        }

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

        public string AllMovies { get; } = FilterModes.AllMovies;

        public string Favorites { get; } = FilterModes.Favorites;

        public string Wishlist { get; } = FilterModes.Wishlist;

        #endregion

        public MainViewModel(string userId)
        {
            _userId = userId;
            _movieService = new MovieService();
            _filter = FilterModes.AllMovies;
            _allMoviesFont = FontAttributes.Bold;
            _favoritesFont = FontAttributes.None;
            _wishlistFont = FontAttributes.None;

            SearchForMovie = new Command(() =>
            {
                var searchViewModel = new SearchViewModel {Navigation = Navigation, MyMovies = _allMovies};
                var searchPage = new SearchPage {BindingContext = searchViewModel};
                Navigation.PushAsync(searchPage);
            });            

            ChangeFilter = new Command(ToggleDisplayFilter);

            SetNewFilter = new Command<string>(filter =>
            {
                Filter = filter;
                ToggleDisplayFilter();
                FilterMovies();
            });
        }

        public async Task InitializeAsync()
        {
            await LoadMovies();
        }

        protected async Task LoadMovies()
        {
            _allMovies = PrepareMovies(await _movieService.GetMovies(_userId));
            FilterMovies();
        }

        protected List<MovieViewModel> PrepareMovies(List<Movie> movies)
        {
            var movieViewModels = movies.Select(m => new MovieViewModel(m) {Navigation = Navigation}).ToList();

            // ReSharper disable once StringCompareToIsCultureSpecific
            movieViewModels.Sort((m1, m2) => m1.Title.CompareTo(m2.Title));

            return movieViewModels;
        }

        protected void ToggleDisplayFilter()
        {
            DisplayFilters = !DisplayFilters;
        }

        protected void OnFontAttributeChange(string propertyName)
        {
            if (propertyName.Contains("All"))
            {
                FavoritesFont = FontAttributes.None;
                WishlistFont = FontAttributes.None;
            }

            if (propertyName.Contains("Favorites"))
            {
                AllMoviesFont = FontAttributes.None;
                WishlistFont = FontAttributes.None;
            }

            if (propertyName.Contains("Wishlist"))
            {
                AllMoviesFont = FontAttributes.None;
                FavoritesFont = FontAttributes.None;
            }
        }

        protected void FilterMovies()
        {
            switch (Filter)
            {
                case FilterModes.AllMovies:
                    AllMoviesFont = FontAttributes.Bold;
                    Movies = _allMovies.FindAll(m => !m.Wishlist);
                    break;
                case FilterModes.Favorites:
                    FavoritesFont = FontAttributes.Bold;
                    Movies = _allMovies.FindAll(m => m.Favorite);
                    break;
                case FilterModes.Wishlist:
                    WishlistFont = FontAttributes.Bold;
                    Movies = _allMovies.FindAll(m => m.Wishlist);
                    break;
            }
        }
    }
}
