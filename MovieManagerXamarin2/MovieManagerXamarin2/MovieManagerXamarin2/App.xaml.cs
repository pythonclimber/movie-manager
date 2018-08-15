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

		        var viewModel = new MainViewModel("58cb3dd6692c796b68ff33ec");
		        MainPage = new NavigationPage(new MainPage { BindingContext = viewModel });
                viewModel.InitializeAsync();
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
