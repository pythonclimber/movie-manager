using System.Collections.Generic;
using System.Linq;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Services;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class SearchViewModel : BaseViewModel
    {
        private string _searchText;
        private IMovieService _movieService;
        private List<SearchResultViewModel> _searchResults;
        private bool _searchError;
        private bool _isLoading;
        private int _totalResults;

        #region Bound Properties

        public string SearchText
        {
            get => _searchText;
            set
            {
                if (SetProperty(ref _searchText, value, "SearchText")
                    && string.IsNullOrWhiteSpace(value))
                {
                    SearchResults = new List<SearchResultViewModel>();
                }
            }
        }

        public bool SearchError
        {
            get => _searchError;
            set => SetProperty(ref _searchError, value, "SearchError");
        }

        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value, "IsLoading");
        }

        public int TotalResults
        {
            get => _totalResults;
            set => SetProperty(ref _totalResults, value, "TotalResults");
        }

        public List<SearchResultViewModel> SearchResults
        {
            get => _searchResults;
            set
            {
                if (SetProperty(ref _searchResults, value, "SearchResults"))
                {
                    OnPropertyChanged("ShowResults");
                    OnPropertyChanged("ShowNoResults");
                }
            }
        }

        public bool ShowResults
        {
            get => SearchResults.Count > 0 && !IsLoading;
        }

        public bool ShowNoResults
        {
            get => _searchResults.Count == 0;
        }

        public List<MovieViewModel> MyMovies { get; set; }

        public ICommand GoToMainPage { get; }

        public ICommand SearchCommand { get; }

        #endregion

        public SearchViewModel()
        {
            _searchResults = new List<SearchResultViewModel>();
            _movieService = new MovieService();

            GoToMainPage = new Command(async () =>
            {
                SearchResults.Clear();
                //await Navigation.PopAsync();
                await new NavigationService(){Navigation = Navigation}.BackToMainPage();
            });

            SearchCommand = new Command(DoSearch);
        }

        protected async void DoSearch()
        {
            IsLoading = true;
            var pageNumber = 1;
            var results = new List<SearchResultViewModel>();
            while (pageNumber <= 5)
            {
                var response = await _movieService.OnlineMovieSearch<SearchResponse>(SearchText, pageNumber);

                if (response.Success)
                {
                    results.AddRange(response
                        .Results
                        .Select(GetSearchResultViewModel)
                        .ToList());

                    pageNumber++;
                }
                else
                {
                    results = new List<SearchResultViewModel>();
                    SearchError = true;
                    break;
                }
            }

            SearchResults = results;
            IsLoading = false;
        }

        protected SearchResultViewModel GetSearchResultViewModel(SearchResult searchResult)
        {
            var searchResultViewModel = new SearchResultViewModel(searchResult)
            {
                Navigation = Navigation
            };

            var myMovie = MyMovies.FirstOrDefault(m => m.ImdbId == searchResult.ImdbId);
            if (myMovie != null)
            {
                searchResultViewModel.UserId = myMovie.UserId;
                searchResultViewModel.Wishlist = myMovie.Wishlist;
            }

            return searchResultViewModel;
        } 
    }
}
