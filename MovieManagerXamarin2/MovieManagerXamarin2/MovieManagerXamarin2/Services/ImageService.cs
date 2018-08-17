using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace MovieManagerXamarin2.Services
{
    public class ImageService
    {
        public static ImageSource WhiteStar { get; set; }

        public static ImageSource GreenStar { get; set; }

        static ImageService()
        {
            var baseUrl = "https://ohgnarly.herokuapp.com";
            GreenStar = ImageSource.FromUri(new Uri($"{baseUrl}/assets/star_green.png"));
            WhiteStar = ImageSource.FromUri(new Uri($"{baseUrl}/assets/star_white.png"));
        }
    }
}
