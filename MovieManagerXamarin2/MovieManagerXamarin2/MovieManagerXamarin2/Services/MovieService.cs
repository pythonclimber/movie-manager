using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using Newtonsoft.Json;

namespace MovieManagerXamarin2.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetMovies(string userId);
    }

    public class MovieService : IMovieService
    {
        private HttpClient _httpClient;
        private string _apiBaseUrl;

        public MovieService()
        {
            _httpClient = new HttpClient();
            _apiBaseUrl = "https://ohgnarly.herokuapp.com";
        }

        public async Task<List<Movie>> GetMovies(string userId)
        {
            var url = $"{_apiBaseUrl}/movies/{userId}";
            var asString = await _httpClient.GetStringAsync(url);

            return JsonConvert.DeserializeObject<List<Movie>>(asString);
        }
    }
}
