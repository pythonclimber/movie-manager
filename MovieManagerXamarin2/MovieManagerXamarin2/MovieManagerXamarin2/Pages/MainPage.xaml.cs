using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using MovieManagerXamarin2.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MovieManagerXamarin2.Pages
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MainPage : ContentPage
	{
		public MainPage()
		{
		    NavigationPage.SetHasNavigationBar(this, false);

            InitializeComponent();
        }
	}
}