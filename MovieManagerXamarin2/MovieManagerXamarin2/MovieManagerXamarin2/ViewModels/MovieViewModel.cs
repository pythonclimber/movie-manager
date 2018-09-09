using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.Services;
using MovieManagerXamarin2.Shared;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class MovieViewModel : BaseViewModel
    {
        private Movie _movie;
        private bool _isReady;
        private ImageSource _imageSource;
        private readonly IMovieService _movieService;
        private List<string> _formats;
        private bool _isAdding;

        #region Bound Properties

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
            set => SetProperty(ref _isReady, value, nameof(IsReady));
        }

        public bool IsMine
        {
            get => !string.IsNullOrWhiteSpace(_movie.UserId) && !Wishlist;
        }

        public bool CanWishlist
        {
            get => string.IsNullOrEmpty(_movie.UserId);
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
                    OnPropertyChanged("IsNotMine");
                    OnPropertyChanged("CanUnWishlist");
                    OnPropertyChanged("CanWishlist");
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
                    OnPropertyChanged("IsNotMine");
                    OnPropertyChanged("CanUnWishlist");
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

        public bool Wishlist
        {
            get => _movie.Wishlist;
            set
            {
                if (value != _movie.Wishlist)
                {
                    _movie.Wishlist = value;
                    OnPropertyChanged("Wishlist");
                    OnPropertyChanged("CanUnWishlist");
                    OnPropertyChanged("IsNotMine");
                    OnPropertyChanged("IsMine");
                }
            }
        }

        public List<string> Formats
        {
            get => _formats;
            set => SetProperty(ref _formats, value, nameof(Formats));
        }

        public bool IsAdding
        {
            get => _isAdding;
            set => SetProperty(ref _isAdding, value, nameof(IsAdding));
        }

        public ICommand ToggleFavorite { get; }

        public ICommand SelectMovie { get; }

        public ICommand GoBack { get; }

        public ICommand AddMovie { get; }

        public ICommand RemoveMovie { get; }

        public ICommand AddWishlist { get; }

        #endregion

        public MovieViewModel(Movie movie)
        {
            _isReady = false;
            _movie = movie;
            _isAdding = false;
            _movieService = new MovieService();

            FormatTitle();

            ToggleFavorite = new Command(async() =>
            {
                Favorite = !Favorite;
                
                
                await _movieService.ToggleFavorite(UserId, ImdbId, Favorite);
                await ReloadFavorites();
            });

            GoBack = new Command(async () =>
            {
                IsReady = false;
                await Navigation.PopAsync();
            });

            SelectMovie = new Command(async () =>
            {
                var moviePage = new MoviePage { BindingContext = this };
                await Navigation.PushAsync(moviePage);
                await LoadMovieDetails();
            });

            AddMovie = new Command(async () =>
            {
                //await _movieService.AddMovie(Movie);
                //await App.GetInstance().NavigationService.BackToMainPage();

                //var viewModel = new FormatPickerViewModel(this);

                //await Navigation.PushModalAsync(new FormatPicker {BindingContext = viewModel});
                IsAdding = true;
            });

            RemoveMovie = new Command(async () =>
            {
                await _movieService.DeleteMovie(Movie);
                UserId = "";
                await App.GetInstance().NavigationService.BackToMainPage();
            });

            AddWishlist = new Command(async () =>
            {
                Wishlist = true;
                await _movieService.AddMovie(Movie);
                await App.GetInstance().NavigationService.BackToMainPage();
            });
        }

        public async Task LoadMovieDetails()
        {
            IsReady = false;

            var movieResponse = await _movieService.GetMovieDetails(_movie.ImdbId);

            if (movieResponse.Success)
            {
                SetMovie(movieResponse.Movie);
                ImageSource = ImageSource.FromUri(new Uri(movieResponse.Movie.Poster));
            }
            else
            {
                await Navigation.PopAsync();
            }

            Formats = await _movieService.GetMovieFormats();

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

        protected void SetMovie(Movie movie)
        {
            Movie = new Movie
            {
                UserId = UserId,
                Wishlist = Wishlist,
                Poster = movie.Poster,
                Favorite = Favorite,
                ImdbId = movie.ImdbId,
                Title = movie.Title,
                Director = movie.Director,
                Plot = movie.Plot,
                Year = movie.Year,
                Format = Format,
                Actors = movie.Actors,
                Genres = movie.Genres,
                Writer = movie.Writer,
                RunTime = movie.RunTime
            };
        }

        protected async Task ReloadFavorites()
        {
            var mainPage = Application.Current.MainPage as NavigationPage;

            if (mainPage?.RootPage.BindingContext is MainViewModel mainViewModel 
                && mainViewModel.Filter == FilterModes.Favorites)
            {
                await mainViewModel.InitializeAsync();
            }
        }
    }
}
