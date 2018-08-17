using System;
using System.Collections.Generic;
using System.Text;

namespace MovieManagerXamarin2.Models
{
    public class SearchResponse
    {
        public bool Success { get; set; }

        public List<SearchResult> Results { get; set; }

        public int TotalResults { get; set; }
    }
}
