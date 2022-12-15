import './sources.css';
import { Source } from "../../interfaces";

class Sources {
  draw(data: Source[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

      data.forEach((item) => {
        let sourceClone: HTMLTemplateElement | null = null;
        if (sourceItemTemp && sourceItemTemp instanceof HTMLTemplateElement)
          sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
        if (sourceClone) {
           const sourceItemName = sourceClone.querySelector('.source__item-name');
        if (sourceItemName) sourceItemName.textContent = item.name;
        }
        if (sourceClone) {
          const sourceItem = sourceClone.querySelector(".source__item");
          if (sourceItem) sourceItem.setAttribute("data-source-id", item.id);
          fragment.append(sourceClone);
        }
    });
    const sources = document.querySelector('.sources');
    if (sources) sources.append(fragment);
  }
}

export default Sources;
