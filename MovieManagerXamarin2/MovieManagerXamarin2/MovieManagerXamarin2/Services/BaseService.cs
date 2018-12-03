using System;
using System.Net.Http;

namespace MovieManagerXamarin2.Services
{
    public class BaseService
    {
        protected readonly HttpClient HttpClient;
        protected readonly string ApiBaseUrl;

        public BaseService()
        {
            HttpClient = new HttpClient();
            ApiBaseUrl = "https://ohgnarly3.herokuapp.com";
            HttpClient.BaseAddress = new Uri("https://ohgnarly3.herokuapp.com");
            HttpClient.DefaultRequestHeaders.Add("api-key", "QlULR6lMQ2gZqZdVplXcn6wyIrNTkGcJPHWsU+gFSFQ=");
            HttpClient.DefaultRequestHeaders.Add("sender", "ohGnarlyMovies");
        }
    }
}
