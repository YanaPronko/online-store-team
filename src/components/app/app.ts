import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, Source, SourcesData} from "../interfaces";


class App {
    public view: AppView;
    public controller: AppController;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const elSources = document.querySelector('.sources');
        if (elSources) {
            elSources.addEventListener("click", (e) => this.controller.getNews(e, (data: NewsData | SourcesData<Source[]>) =>
                  this.view.drawNews(data)
              )
            );
            this.controller.getSources((data: NewsData | SourcesData<Source[]>) => this.view.drawSources(data)
            );
        }
    }
}

export default App;
