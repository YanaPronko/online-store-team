import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.up.railway.app/', {
      apiKey: '989fe8bbf13d4005a60c6c2f414719c7', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
