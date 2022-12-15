import { Endpoints, NewsData, Source, SourcesData } from '../interfaces';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: (data: NewsData | SourcesData<Source[]>) => void) {
    super.getResp(
      {
        endpoint: Endpoints.SOURCES,
      },
      callback
    );
  }

  getNews(e: Event, callback: (data: NewsData | SourcesData<Source[]>) => void) {
    let target = e.target;
    const newsContainer = e.currentTarget;

    while (target !== newsContainer) {
      if (target && target instanceof HTMLElement) {
        if (target.classList.contains("source__item")) {
          const sourceId = target.getAttribute("data-source-id");
          if (sourceId && newsContainer instanceof HTMLElement)
            if (newsContainer.getAttribute("data-source") !== sourceId) {
              newsContainer.setAttribute("data-source", sourceId);
              super.getResp(
                {
                  endpoint: Endpoints.EVERYTHING,
                  options: {
                    sources: sourceId,
                  },
                },
                callback
              );
            }
          return;
        }
      }
      if (target && target instanceof HTMLElement) target = target.parentNode;
    }
  }
}

export default AppController;
