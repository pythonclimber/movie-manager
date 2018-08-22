using System;

namespace MovieManagerXamarin2.ViewModels
{
    public class WaitViewModel : BaseViewModel
    {
        private Action _waitingAction;

        public WaitViewModel(Action waitingAction)
        {
            _waitingAction = waitingAction;
        }

        public void ProcessWait()
        {
            _waitingAction.Invoke();
        }
    }
}
