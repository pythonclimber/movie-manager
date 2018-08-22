using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;

namespace MovieManagerXamarin2.Services
{
    public class NavigationService
    {
        private MoviePage _moviePage;
        private MainPage _mainPage;
        private LoginPage _loginPage;
        private SearchPage _searchPage;
        private WaitingPage _waitingPage;

        public INavigation Navigation { get; set; }

        public NavigationService()
        {
        }

        public async void ShowMoviePage(Movie movie)
        {
            if (_moviePage == null)
            {
                _moviePage = new MoviePage();
            }

            var movieViewModel = new MovieViewModel(movie);// {NavigationService = this};
            _moviePage.BindingContext = movieViewModel;

            await Navigation.PushAsync(_moviePage);
            await movieViewModel.LoadMovieDetails();
        }

        public async void ShowSearchPage(List<MovieViewModel> myMovies)
        {
            if (_searchPage == null)
            {
                _searchPage = new SearchPage();
            }

            var searchViewModel = new SearchViewModel
            {
                //NavigationService = this,
                MyMovies = myMovies
            };

            _searchPage.BindingContext = searchViewModel;

            await Navigation.PushAsync(_searchPage);
        }

        public async void ShowMainPage(string userId)
        {
            if (_mainPage == null)
            {
                _mainPage = new MainPage();
            }

            var mainViewModel = new MainViewModel(userId);// {NavigationService = this};
            _mainPage.BindingContext = mainViewModel;

            await Navigation.PushAsync(_mainPage);
            mainViewModel.InitializeAsync();
        }

        public async void ShowWaitingPage(Action waitAction)
        {
            if (_waitingPage == null)
            {
                _waitingPage = new WaitingPage();
            }

            var waitingViewModel = new WaitViewModel(waitAction);// {NavigationService = this};
            _waitingPage.BindingContext = waitingViewModel;

            await Navigation.PushAsync(_waitingPage);
        }

        public async void ShowLoginPage()
        {
            if (_loginPage == null)
            {
                _loginPage = new LoginPage();
            }

            var loginViewModel = new LoginViewModel();// {NavigationService = this};
            _loginPage.BindingContext = loginViewModel;

            await Navigation.PushAsync(_loginPage);
        }

        public async Task BackToMainPage()
        {
            var mainPage = Application.Current.MainPage as NavigationPage;
            var viewModel = mainPage?.RootPage.BindingContext as MainViewModel;

            if (viewModel == null)
            {
                throw new ApplicationException("Could not retrieve MainViewModel");
            }

            await viewModel.InitializeAsync();
            await Navigation.PopToRootAsync();
        }

        public async Task BackOnePage()
        {
            await Navigation.PopAsync();
        }

        public async Task CloseModal()
        {
            await Navigation.PopModalAsync();
        }
    }
}
