import News from './news/news';
import Sources from './sources/sources';
import { NewsData, Source, SourcesData } from "../interfaces";


export class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: NewsData | SourcesData<Source[]>): void {
    if ("articles" in data) {
      const values = data?.articles ? data?.articles : [];
      this.news.draw(values);
    }
  }
  drawSources(data: NewsData | SourcesData<Source[]>): void {
    if ("sources" in data) {
      const values = data?.sources ? data?.sources : [];
      this.sources.draw(values);
    }
  }
}


export default AppView;
