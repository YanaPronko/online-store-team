import { Endpoints, GetRespOptionParams, Methods, NewsData, Options, Source, SourcesData } from "../interfaces";

interface ILoader {
  baseLink: string;
  options: Options;
  getResp(
    options: GetRespOptionParams,
    callback: (data: NewsData | SourcesData<Source[]>) => void
  ): void;
  errorHandler(res: Response): Response;
  makeUrl(options: Options, endpoint: Endpoints): string;
  load(
    method: Methods,
    endpoint: Endpoints,
    callback: (data: NewsData | SourcesData<Source[]>) => void,
    options: Options
  ): void;
}

class Loader implements ILoader {
  baseLink: string;
  options: Options;
  constructor(baseLink: string, options: Options) {
    this.baseLink = baseLink;
    this.options = options;
  }

  // getResp(options: GetRespOptionParams, callback?: (data: NewsData) => void): void;
/*   getResp(
    options: GetRespOptionParams,
    callback: (data: NewsData | SourcesData<Source[]>) => void
  ): void; */
  getResp(
    { endpoint, options = {} }: GetRespOptionParams,
    callback: (data: NewsData | SourcesData<Source[]>) => void = () => {
      console.error("No callback for GET response");
    }
  ): void {
    this.load(Methods.GET, endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: Options, endpoint: Endpoints): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof Options]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: Methods,
    endpoint: Endpoints,
    callback: (data: NewsData | SourcesData<Source[]>) => void,
    options: Options = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: NewsData | SourcesData<Source[]>) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
