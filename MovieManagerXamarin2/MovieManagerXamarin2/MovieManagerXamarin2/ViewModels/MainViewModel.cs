using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using Newtonsoft.Json;

namespace MovieManagerXamarin2.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        private List<Movie> _movies;
        private Movie _selectedMovie;
        private string _userId;

        public List<Movie> Movies
        {
            get => _movies;
            set
            {
                if (value != _movies)
                {
                    _movies = value;
                    OnPropertyChanged("Movies");
                }
            }
        }

        public Movie SelectedMovie
        {
            get => _selectedMovie;
            set
            {
                if (value != _selectedMovie)
                {
                    _selectedMovie = value;
                    OnPropertyChanged("SelectedMovie");
                }
            }
        }

        public MainViewModel(string userId)
        {
            _userId = userId;
        }

        public async Task InitializeAsync()
        {
            LoadMovies();
        }

        protected async Task LoadMovies()
        {
            var httpClient = new HttpClient();
            var httpResponse = 
                await httpClient.GetStringAsync($"https://ohgnarly.herokuapp.com/movies/{_userId}");
            Movies = PrepareMovies(httpResponse);
        }

        protected List<Movie> PrepareMovies(string httpResponse)
        {
            var movies = JsonConvert
                .DeserializeObject<List<Movie>>(httpResponse);
            var formatTitleTasks = new List<Task>();

            foreach (var movie in movies)
            {
                formatTitleTasks.Add(Task.Run(() =>
                {
                    return movie.Title = FormatMovieTitle(movie.Title);
                }));
            }

            Task.WaitAll(formatTitleTasks.ToArray());

            movies.Sort((m1, m2) => m1.Title.CompareTo(m2.Title));

            return movies;
        }

        protected string FormatMovieTitle(string title)
        {
            if (title.StartsWith("The "))
            {
                return title.Substring(4) + ", The";
            }
            if (title.StartsWith("A "))
            {
                return title.Substring(2) + ", A";
            }
            if (title.StartsWith("An "))
            {
                return title.Substring(3) + ", An";
            }

            return title;
        }
    }
}
