import {JokeModel} from './models/joke';

function serializeMap(map: Map<any, any>): string {
  return JSON.stringify(Array.from(map.entries()));
}

function deserializeMap<T, P>(stringifiedMap: string): Map<T, P> {
  return new Map<T, P>(JSON.parse(stringifiedMap));
}

const UNCATEGORIZED_CATEGORY_KEY = 'uncategorized';
const ALL_JOKES_STORAGE_KEY = 'cj-all-jokes';

export function storeJokes(jokes: JokeModel[]) {
  const map = new Map<string, JokeModel[]>();
  for (const joke of jokes) {
    let cateKey = UNCATEGORIZED_CATEGORY_KEY;
    if (joke.categories?.length) {
      cateKey = joke.categories[0];
    }
    const cachedJokes = map.get(cateKey);
    if (cachedJokes != null) {
      cachedJokes.push(joke);
      map.set(cateKey, cachedJokes);
    } else {
      map.set(cateKey, [joke]);
    }
  }
  localStorage.setItem(ALL_JOKES_STORAGE_KEY, serializeMap(map));
}

export function retrieveJokes(cateKey: string): JokeModel[] {
  const stringifiedData = localStorage.getItem(ALL_JOKES_STORAGE_KEY);
  if (stringifiedData == null) {
    return [];
  }
  return (
    deserializeMap<string, JokeModel[]>(stringifiedData)?.get(cateKey) ?? []
  );
}
