import type {JokeModel} from '../models/joke';

import AxiosService from '../lib/axios';

const API_LOCAL_HOST =
  process.env.REACT_APP_API_LOCAL_HOST ||
  'http://localhost:3000';

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

export async function fetchJokeById(
  jokeId?: string,
): Promise<JokeModel | null> {
  if (jokeId == null) {
    return null;
  }
  try {
    const response = await AxiosService.get<JokeModel>(`/jokes/${jokeId}`);
    return response?.data ?? null;
  } catch (error) {
    throw error;
  }
}

export async function fetchJokeInfo(
  jokeId?: string,
): Promise<{like: number; dislike: number} | null> {
  if (jokeId == null) {
    return null;
  }
  try {
    const response = await AxiosService.get<
      Record<string, {like: number; dislike: number}>
    >(`/jokesInfo`, {
      baseURL: API_LOCAL_HOST,
    });
    return response?.data?.[jokeId] ?? null;
  } catch (error) {
    throw error;
  }
}

async function fetchJokeInfoMap(): Promise<Record<
  string,
  {like: number; dislike: number}
> | null> {
  try {
    const response = await AxiosService.get<
      Record<string, {like: number; dislike: number}>
    >(`/jokesInfo`, {
      baseURL: API_LOCAL_HOST,
    });
    return response?.data ?? null;
  } catch (error) {
    throw error;
  }
}

export async function likeJoke(
  jokeId?: string,
): Promise<{like: number; dislike: number} | null> {
  if (jokeId == null) {
    return null;
  }

  try {
    const jokeInfo = await fetchJokeInfoMap();
    if (jokeInfo?.[jokeId] != null) {
      const jokeValues = jokeInfo?.[jokeId];
      jokeInfo[jokeId] = {...jokeValues, like: jokeValues.like + 1};
    } else if (jokeInfo != null) {
      jokeInfo[jokeId] = {
        like: 1,
        dislike: 0,
      };
    }
    const response = await AxiosService.patch<
      Record<string, {like: number; dislike: number}>
    >(`/jokesInfo`, jokeInfo, {
      baseURL: API_LOCAL_HOST,
    });
    return response?.data?.[jokeId] ?? null;
  } catch (error) {
    throw error;
  }
}

export async function dislikeJoke(
  jokeId?: string,
): Promise<{like: number; dislike: number} | null> {
  if (jokeId == null) {
    return null;
  }

  try {
    const jokeInfo = await fetchJokeInfoMap();
    if (jokeInfo?.[jokeId] != null) {
      const jokeValues = jokeInfo?.[jokeId];
      jokeInfo[jokeId] = {...jokeValues, dislike: jokeValues.dislike + 1};
    } else if (jokeInfo != null) {
      jokeInfo[jokeId] = {
        like: 0,
        dislike: 1,
      };
    }
    const response = await AxiosService.patch<
      Record<string, {like: number; dislike: number}>
    >(`/jokesInfo`, jokeInfo, {
      baseURL: API_LOCAL_HOST,
    });
    return response?.data?.[jokeId] ?? null;
  } catch (error) {
    throw error;
  }
}
