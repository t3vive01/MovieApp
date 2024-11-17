import { SearchResult, Genre } from "./types";


export const fetchSearchResults = async (query: string, genre: number | null): Promise<SearchResult> => {
  const response = await fetch(`http://localhost:3000/api/movies?search=${query}${genre ? '&genre=' + genre : ''}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`http://localhost:3000/api/movies/genres`);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }


  const data = await response.json();
  return data;
};

