using System;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation (XamlCompilationOptions.Compile)]
namespace MovieManagerXamarin2
{
	public partial class App : Application
	{
		public App ()
		{
		    try
		    {
		        InitializeComponent();

		        var viewModel = new LoginViewModel();
		        MainPage = new NavigationPage(new LoginPage() { BindingContext = viewModel });
                //viewModel.InitializeAsync();
		        viewModel.Navigation = MainPage.Navigation;
            }
		    catch (Exception e)
		    {
                Console.Write(e);
		    }
		}

		protected override void OnStart()
		{
			// Handle when your app starts
		}

		protected override void OnSleep()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume()
		{
			// Handle when your app resumes
		}
	}
}
