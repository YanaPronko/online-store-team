export interface BaseOptions {
  readonly apiKey: string;
}
export interface SourceOptions {
  category?: string;
  language?: string;
  country?: string;
}

export interface EverythingOptions {
  q?: string;
  searchIn?: string;
  sources?: string;
  domains?: string;
  exludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: string;
  page?: string;
}

export type Options = BaseOptions | SourceOptions | EverythingOptions;

export interface Article {
  readonly source: { id: string; name: string };
  readonly title: string;
  readonly author: string;
  readonly content: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly url: string;
  readonly urlToImage: string;
}

export interface Source {
  id: string;
  name: string;
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
}
export enum Endpoints {
  EVERYTHING = 'everything',
  SOURCES = 'sources',
}

export interface GetRespOptionParams {
   endpoint: Endpoints;
   options?: SourceOptions | EverythingOptions;
}

export interface Response {
  readonly status: string;
}

export interface NewsData extends Response {
  readonly articles: Article[];
  readonly totalResults: number;
}

export interface SourcesData<T> extends Response {
  readonly sources: T;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly category: string;
  readonly language: string;
  readonly country: string;
}
