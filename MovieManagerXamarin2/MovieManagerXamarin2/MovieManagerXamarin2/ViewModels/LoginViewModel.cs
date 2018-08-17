using System.Windows.Input;
using MovieManagerXamarin2.Services;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class LoginViewModel : BaseViewModel
    {
        private ILoginService _loginService;
        private string _username;
        private string _password;

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

        public ICommand LoginTap { get; }

        public LoginViewModel()
        {
            _loginService = new LoginService();

            var credentials = _loginService.GetSavedCredentials();
            _username = credentials?.Username;
            _password = credentials?.Password;

            LoginTap = new Command(async () =>
            {
                var waitViewModel = new WaitViewModel(ProcessLogin);
                await Navigation.PushAsync(new WaitingPage {BindingContext = waitViewModel});
                waitViewModel.ProcessWait();
            });
        }

        protected async void ProcessLogin()
        {
            var loginResponse = await _loginService.Login(Username, Password);
            if (loginResponse.Success)
            {
                var mainViewModel = new MainViewModel(loginResponse.UserId)
                {
                    Navigation = Navigation
                };

                await Navigation
                    .PushAsync(new MainPage { BindingContext = mainViewModel });
                mainViewModel.InitializeAsync();
                await _loginService.SaveCredentials(Username, Password, loginResponse.UserId);
            }
        }
    }
}
