using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MovieManagerXamarin2
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MoviePage : ContentPage
	{
		public MoviePage()
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