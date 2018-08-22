using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MovieManagerXamarin2.Pages
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
		public LoginPage()
		{
		    NavigationPage.SetHasNavigationBar(this, false);

            InitializeComponent();
		}
	}
}