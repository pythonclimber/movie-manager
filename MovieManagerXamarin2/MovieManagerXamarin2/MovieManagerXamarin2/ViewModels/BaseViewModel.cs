using System.ComponentModel;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class BaseViewModel : INotifyPropertyChanged
    {
        protected const string AppBackgroundColor = "#2b2c2d";
        public event PropertyChangedEventHandler PropertyChanged;
        protected object LockObject = new object();

        public INavigation Navigation { get; set; }

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        protected virtual bool SetProperty<T>(ref T currentValue, T newValue, string propertyName)
        {
            var sameValue = currentValue?.Equals(newValue) ?? false;
            if (sameValue)
                return false;

            currentValue = newValue;
            OnPropertyChanged(propertyName);
            return true;
        }
    }
}
