using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MovieManagerXamarin2.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetMovies(string userId);

        Task ToggleFavorite(string userId, string imdbId, bool favorite);

        Task<T> OnlineMovieSearch<T>(string title, int page = 1);

        Task<Movie> AddMovie(Movie movie);

        Task DeleteMovie(Movie movie);

        Task<MovieDetailResponse> GetMovieDetails(string imdbId);

        Task<List<string>> GetMovieFormats();

        Task AddFromWishlist(Movie movie);
    }

    public class MovieService : BaseService, IMovieService
    {
        private readonly LoginService _loginService;
        private readonly JsonSerializerSettings _jsonSettings;

        public MovieService()
        {
            
            _loginService = new LoginService();
            _jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        public async Task<List<Movie>> GetMovies(string userId)
        {
            var url = $"{ApiBaseUrl}/movies/{userId}";
            var asString = await HttpClient.GetStringAsync(url);

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

            await HttpClient.PutAsync($"{ApiBaseUrl}/movie", content);
        }

        public async Task<T> OnlineMovieSearch<T>(string title, int page = 1)
        {
            var url = $"{ApiBaseUrl}/movie-search/${title}/${page}";
            var asString = await HttpClient.GetStringAsync(url);

            return JsonConvert.DeserializeObject<T>(asString);
        }

        public async Task<Movie> AddMovie(Movie movie)
        {
            var user = _loginService.GetSavedCredentials();
            var data = new
            {
                title = movie.Title,
                description = string.Empty,
                userId = user?.UserId ?? "58cb3dd6692c796b68ff33ec",
                director = movie.Director,
                imdbid = movie.ImdbId,
                wishlist = movie.Wishlist,
                format = movie.Wishlist ? "" : movie.Format //Do not set format for wishlist adds.
            };

            var asString = new StringContent(JsonConvert.SerializeObject(data, _jsonSettings), 
                Encoding.UTF8, "application/json");
            var response = await HttpClient.PostAsync($"{ApiBaseUrl}/movie", asString);

            return JsonConvert.DeserializeObject<Movie>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task DeleteMovie(Movie movie)
        {
            var url = $"{ApiBaseUrl}/movie/{movie.UserId}/{movie.ImdbId}";

            await HttpClient.DeleteAsync(url);
        }

        public async Task<MovieDetailResponse> GetMovieDetails(string imdbId)
        {
            var httpResponse =
                await HttpClient.GetStringAsync($"{ApiBaseUrl}/movie-details/{imdbId}");

            return JsonConvert.DeserializeObject<MovieDetailResponse>(httpResponse);
        }

        public async Task<List<string>> GetMovieFormats()
        {
            var httpResponse = await HttpClient.GetStringAsync($"{ApiBaseUrl}/movie-formats");

            return JsonConvert.DeserializeObject<List<string>>(httpResponse);
        }

        public async Task AddFromWishlist(Movie movie)
        {
            var data = new
            {
                userId = movie.UserId,
                imdbid = movie.ImdbId,
                update = new
                {
                    wishlist = false,
                    format = movie.Format
                }
            };

            var asString = new StringContent(
                JsonConvert.SerializeObject(data), Encoding.UTF8, "applicaiton/json");

            await HttpClient.PutAsync($"{ApiBaseUrl}/movie", asString);
        }
    }
}
