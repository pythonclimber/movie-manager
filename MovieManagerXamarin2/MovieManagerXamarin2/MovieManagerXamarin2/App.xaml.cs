using System;
using System.Threading.Tasks;
using MovieManagerXamarin2.Pages;
using MovieManagerXamarin2.Services;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation (XamlCompilationOptions.Compile)]
namespace MovieManagerXamarin2
{
	public partial class App
	{
        public NavigationService NavigationService { get; set; }

		public App ()
		{
		    try
		    {
		        InitializeComponent();

                //var viewModel = new LoginViewModel();
                //MainPage = new NavigationPage(new LoginPage() { BindingContext = viewModel });
                //viewModel.Navigation = MainPage.Navigation;
                var viewModel = new MainViewModel("58cb3dd6692c796b68ff33ec");
                MainPage = new NavigationPage(new MainPage {BindingContext = viewModel});
		        viewModel.Navigation = MainPage.Navigation;
		        Task.Run(async () =>
		        {
		            await viewModel.InitializeAsync();
                });
		        NavigationService = new NavigationService { Navigation = MainPage.Navigation };
            }
		    catch (Exception e)
		    {
                Console.Write(e);
		    }
		}

	    public static App GetInstance()
	    {
	        if (!(Current is App app))
	        {
                throw new ApplicationException("Unable to get App instance.");
	        }

	        return app;
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
