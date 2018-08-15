using System;
using System.Collections.Generic;
using System.Text;

namespace MovieManagerXamarin2.Models
{
    public class MovieDetailResponse
    {
        public bool Success { get; set; }

        public Movie Movie { get; set; }
    }
}
