using System;
using System.Collections.Generic;
using System.Text;

namespace MovieManagerXamarin2.Models
{
    public class SearchResult
    {
        public string Title { get; set; }

        public string Year { get; set; }

        public string ImdbId { get; set; }

        public string Type { get; set; }

        public string Poster { get; set; }

        public string UserId { get; set; }

        public bool Wishlist { get; set; }
    }
}
