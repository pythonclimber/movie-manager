using System;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.Shared;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class SearchResultViewModel : BaseViewModel
    {
        private SearchResult _searchResult;
        private ImageSource _imageSource;

        #region Bound Properties

        public string Title
        {
            get => _searchResult.Title;
            set
            {
                if (value != _searchResult.Title)
                {
                    _searchResult.Title = value;
                    OnPropertyChanged("Title");
                }
            }
        }

        public string Year
        {
            get => _searchResult.Year;
            set
            {
                if (value != _searchResult.Year)
                {
                    _searchResult.Year = value;
                    OnPropertyChanged("Year");
                }
            }
        }

        public string ImdbId
        {
            get => _searchResult.ImdbId;
            set
            {
                if (value != _searchResult.ImdbId)
                {
                    _searchResult.ImdbId = value;
                    OnPropertyChanged("ImdbId");
                }
            }
        }

        public string Type
        {
            get => _searchResult.Type;
            set
            {
                if (value != _searchResult.Type)
                {
                    _searchResult.Type = value;
                    OnPropertyChanged("Type");
                }
            }
        }

        public string Poster
        {
            get => _searchResult.Poster;
            set
            {
                if (value != _searchResult.Poster)
                {
                    _searchResult.Poster = value;
                    OnPropertyChanged("Poster");
                }
            }
        }

        public string UserId
        {
            get => _searchResult.UserId;
            set
            {
                if (value != _searchResult.UserId)
                {
                    _searchResult.UserId = value;
                    OnPropertyChanged("UserId");
                }
            }
        }

        public bool Wishlist
        {
            get => _searchResult.Wishlist;
            set
            {
                if (value != _searchResult.Wishlist)
                {
                    _searchResult.Wishlist = value;
                    OnPropertyChanged("Wishlist");
                }
            }
        }

        public ImageSource ImageSource
        {
            get => _imageSource;
            set => SetProperty(ref _imageSource, value, "ImageSource");
        }

        public ICommand MovieTap { get; }

        #endregion

        public SearchResultViewModel(SearchResult searchResult)
        {
            _searchResult = searchResult;

            LoadImage();

            MovieTap = new Command(async () =>
            {
                var movie = new Movie
                {
                    Title = Title,
                    Year = Year,
                    ImdbId = ImdbId,
                    Poster = Poster,
                    UserId = UserId,
                    Wishlist = Wishlist
                };
                var movieViewModel =
                    new MovieViewModel(movie)
                    {
                        Navigation = Navigation
                    };
                var moviePage = new MoviePage {BindingContext = movieViewModel};
                await Navigation.PushAsync(moviePage);
                await movieViewModel.LoadMovieDetails();
            });
        }

        public void LoadImage()
        {
            if (!string.IsNullOrWhiteSpace(Poster) && Poster.StartsWith("http"))
            {
                ImageSource = ImageSource.FromUri(new Uri(Poster));
            }
        }
    }
}
