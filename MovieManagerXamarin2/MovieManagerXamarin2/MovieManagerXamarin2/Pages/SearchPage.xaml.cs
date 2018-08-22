using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Channels;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MovieManagerXamarin2.Pages
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class SearchPage : ContentPage
	{
		public SearchPage()
		{
		    NavigationPage.SetHasNavigationBar(this, false);
		    if (Application.Current.MainPage is NavigationPage navigationPage)
		    {
		        navigationPage.BarBackgroundColor = Color.FromHex("#2b2c2d");
		    }

            InitializeComponent();
		}
	}
}