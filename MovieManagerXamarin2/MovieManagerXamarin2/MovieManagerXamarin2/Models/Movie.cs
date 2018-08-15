using System;
using System.Collections.Generic;
using System.Text;

namespace MovieManagerXamarin2.Models
{
    public class Movie
    {
        public string Title { get; set; }

        public string Director { get; set; }

        public string _Id { get; set; }

        public string MovieId => _Id;

        public string UserId { get; set; }

        public string ImdbId { get; set; }

        public bool Favorite { get; set; }

        public string Year { get; set; }

        public string RunTime { get; set; }

        public string Genres { get; set; }

        public string Writer { get; set; }

        public string Plot { get; set; }

        public string Actors { get; set; }

        public string Poster { get; set; }

        public bool Wishlist { get; set; }

        public string Format { get; set; }
    }
}
