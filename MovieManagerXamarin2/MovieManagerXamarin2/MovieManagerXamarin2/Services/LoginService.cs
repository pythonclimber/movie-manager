using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MovieManagerXamarin2.Models;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace MovieManagerXamarin2.Services
{
    public interface ILoginService
    {
        Task<LoginResponse> Login(string userName, string password);

        Task SaveCredentials(string username, string password, string userId);

        SavedCredentials GetSavedCredentials();
    }

    public class LoginService : BaseService, ILoginService
    {
        private const string CredentialsKey = "my_credentials";

        public async Task<LoginResponse> Login(string userName, string password)
        {
            var data = new
            {
                userName,
                password
            };

            var content = new StringContent(
                JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var response = await HttpClient.PostAsync("/login", content);

            return JsonConvert.DeserializeObject<LoginResponse>(
                await response.Content.ReadAsStringAsync());
        }

        public async Task SaveCredentials(string username, string password, string userId)
        {
            if (Application.Current.Properties.ContainsKey(CredentialsKey))
                return;

            var credentials = new SavedCredentials
            {
                Username = username,
                Password = password,
                UserId = userId
            };

            var asString = JsonConvert.SerializeObject(credentials);

            Application.Current.Properties.Add(CredentialsKey, asString);

            await Application.Current.SavePropertiesAsync();
        }

        public SavedCredentials GetSavedCredentials()
        {
            var asString = Application.Current.Properties.ContainsKey(CredentialsKey)
                ? Application.Current.Properties[CredentialsKey] as string
                : null;

            return asString == null ? null : JsonConvert.DeserializeObject<SavedCredentials>(asString);
        }
    }
}
