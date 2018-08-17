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

        Task ToggleFavorite(string userId, string imdbId, bool favorite);

        Task<T> OnlineMovieSearch<T>(string title, int page = 1);
    }

    public class MovieService : IMovieService
    {
        private HttpClient _httpClient;
        private string _apiBaseUrl;

        public MovieService()
        {
            _httpClient = new HttpClient();
            _apiBaseUrl = "https://ohgnarly3.herokuapp.com";
        }

        public async Task<List<Movie>> GetMovies(string userId)
        {
            var url = $"{_apiBaseUrl}/movies/{userId}";
            var asString = await _httpClient.GetStringAsync(url);

            return JsonConvert.DeserializeObject<List<Movie>>(asString);
        }

        public async Task ToggleFavorite(string userId, string imdbid, bool favorite)
        {
            var data = new
            {
                userId,
                imdbid,
                update = new
                {
                    favorite
                }
            };

            var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"{_apiBaseUrl}/movie", content);
            Console.Write(response);
        }

        public async Task<T> OnlineMovieSearch<T>(string title, int page = 1)
        {
            var url = $"{_apiBaseUrl}/movie-search/${title}/${page}";
            var asString = await _httpClient.GetStringAsync(url);

            return JsonConvert.DeserializeObject<T>(asString);
        }
    }
}
