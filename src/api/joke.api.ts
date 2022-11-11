import type {JokeModel} from '../models/joke';

import AxiosService from '../lib/axios';

interface AllJokesResponse<T> {
  total: number;
  result: T[];
}

/**
 *
 * @param query
 * @returns
 */
export async function fetchAllJokes(
  query = 'all',
): Promise<AllJokesResponse<JokeModel>> {
  try {
    const response = await AxiosService.get<AllJokesResponse<JokeModel>>(
      `/jokes/search?query=${query}`,
    );
    return (
      response?.data ?? {
        total: 0,
        result: [],
      }
    );
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param
 * @returns {string[]} categories
 */
export async function fetchJokeCategories(): Promise<string[]> {
  try {
    const response = await AxiosService.get<string[]>('/jokes/categories');
    return response?.data ?? [];
  } catch (error) {
    throw error;
  }
}
