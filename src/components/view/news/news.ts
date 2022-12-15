import './news.css';
import {Article } from "../../interfaces";

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            let newsClone: HTMLTemplateElement | null = null;
            if (newsItemTemp && newsItemTemp instanceof HTMLTemplateElement)
                newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            if (idx % 2) {
                if (newsClone) {
                    const newsItem = newsClone.querySelector('.news__item');
                    if (newsItem) newsItem.classList.add('alt');
                }
            }
            if (newsClone) {
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto && newsMetaPhoto instanceof HTMLElement)
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'assets/news_placeholder.jpg'
                })`;
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;
                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate) newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                const newsDesriptionTitle = newsClone.querySelector('.news__description-title');
                if (newsDesriptionTitle) newsDesriptionTitle.textContent = item.title;
                const newsDesriptionSource = newsClone.querySelector('.news__description-source');
                if (newsDesriptionSource) newsDesriptionSource.textContent = item.source.name;
                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;
                const newsRefMore = newsClone.querySelector('.news__read-more a');
                if (newsRefMore) newsRefMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });
        const newsOld = document.querySelector('.news');
        if (newsOld) {
            newsOld.innerHTML = '';
            newsOld.appendChild(fragment);
        }
    }
}

export default News;
