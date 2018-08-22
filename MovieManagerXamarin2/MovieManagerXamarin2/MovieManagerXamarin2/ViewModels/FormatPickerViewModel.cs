using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows.Input;
using MovieManagerXamarin2.Services;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class FormatPickerViewModel : BaseViewModel
    {
        private MovieViewModel _movieViewModel;
        private IMovieService _movieService;
        private string _selectedFormat;
        private List<string> _formats;

        public ICommand Cancel { get; }

        public ICommand Save { get; }

        public List<string> Formats
        {
            get => _formats;
            set => SetProperty(ref _formats, value, nameof(Formats));
        }

        public string SelectedFormat
        {
            get => _selectedFormat;
            set => SetProperty(ref _selectedFormat, value, nameof(SelectedFormat));
        }

        public FormatPickerViewModel(MovieViewModel movieViewModel)
        {
            _movieViewModel = movieViewModel;
            _movieService = new MovieService();

            var task = Task.Run(async () => { Formats = await _movieService.GetMovieFormats(); });

            Save = new Command(async () =>
            {
                if (string.IsNullOrWhiteSpace(SelectedFormat))
                {
                    MessagingCenter.Send(this, "A format must be selected.", "A format must be selected.");
                    return;
                }

                _movieViewModel.Format = SelectedFormat;
                if (movieViewModel.Wishlist)
                {
                    await _movieService.AddFromWishlist(_movieViewModel.Movie);
                }
                else
                {
                    await _movieService.AddMovie(_movieViewModel.Movie);
                    await App.GetInstance().NavigationService.CloseModal();
                }

                await App.GetInstance().NavigationService.BackToMainPage();
            });

            Cancel = new Command(async () => { await App.GetInstance().NavigationService.CloseModal(); });

            task.Wait();
        }
    }
}
