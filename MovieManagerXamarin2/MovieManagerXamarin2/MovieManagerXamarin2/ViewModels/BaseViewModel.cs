using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using Xamarin.Forms;

namespace MovieManagerXamarin2.ViewModels
{
    public class BaseViewModel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

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
