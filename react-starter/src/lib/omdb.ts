const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

const API_URL = "https://www.omdbapi.com/"

export type MediaType = 'movie' | 'series' | 'episode'

export type SearchParams = {
  title?: string;       // t= exact title OR use s= for search
  query?: string;       // s=
  year?: string;        // y=
  type?: MediaType;     // type=
  page?: number;        // page= (1..100)
  imdbID?: string;      // i= 
};

export type SearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MediaType;
};

export type SearchResponse = {
  Search?: SearchItem[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
};

export type FullItem = SearchItem & {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: { Source: string; Value: string }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  totalSeasons?: string; // for series
};

function buildURL(params: Record<string, string | number | undefined>) {
  const url = new URL('API_BASE');
  url.searchParams.set('apikey', API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  });
  return url.toString();
}

export async function searchMedia({ query, year, type, page = 1 }: SearchParams): Promise<SearchResponse> {
  const url = buildURL({ s: query, y: year, type, page });
  const res = await fetch(url);
  if (!res.ok) throw new Error('OMDb error: ${res.status}');
  return res.json();
}

export async function getById(imdbID: string): Promise<FullItem> {
  const url = buildURL({ i: imdbID, plot: 'short' });
  const res = await fetch(url);
  if (!res.ok) throw new Error('OMDb error: ${res.status}');
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'Not found');
  return data as FullItem;
}

export async function getByExactTitle(title: string, year?: string, type?: MediaType): Promise<FullItem> {
  const url = buildURL({ t: title, y: year, type });
  const res = await fetch(url);
  if (!res.ok) throw new Error('OMDb error: ${res.status}');
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'Not found');
  return data as FullItem;
}