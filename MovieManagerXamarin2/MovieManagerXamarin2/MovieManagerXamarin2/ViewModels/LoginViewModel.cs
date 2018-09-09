using System.Windows.Input;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.Services;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class LoginViewModel : BaseViewModel
    {
        private ILoginService _loginService;
        private string _username;
        private string _password;
        private bool _isReady;

        public string Username
        {
            get => _username;
            set => SetProperty(ref _username, value, "Username");
        }

        public string Password
        {
            get => _password;
            set => SetProperty(ref _password, value, "Password");
        }

        public bool IsReady
        {
            get => _isReady;
            set
            {
                if (value != _isReady)
                {
                    _isReady = value;
                    OnPropertyChanged(nameof(IsReady));
                    OnPropertyChanged(nameof(IsPaused));
                }
            }
        }

        public bool IsPaused
        {
            get => !_isReady;
        }

        public ICommand LoginTap { get; }

        public LoginViewModel()
        {
            _loginService = new LoginService();

            var credentials = _loginService.GetSavedCredentials();
            _username = credentials?.Username;
            _password = credentials?.Password;

            //LoginTap = new Command(async () =>
            //{
            //    var waitViewModel = new WaitViewModel(ProcessLogin);
            //    await Navigation.PushAsync(new WaitingPage {BindingContext = waitViewModel});
            //    waitViewModel.ProcessWait();
            //});

            LoginTap = new Command(ProcessLogin);

            _isReady = true;
        }

        protected async void ProcessLogin()
        {
            IsReady = false;
            var loginResponse = await _loginService.Login(Username, Password);
            if (loginResponse.Success)
            {
                var mainViewModel = new MainViewModel(loginResponse.UserId)
                {
                    Navigation = Navigation
                };

                await _loginService.SaveCredentials(Username, Password, loginResponse.UserId);
                await App.GetInstance().NavigationService.BackToMainPage();
                IsReady = true;
            }
        }
    }
}
