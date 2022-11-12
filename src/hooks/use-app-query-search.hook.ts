import React from 'react';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

// NOTE: This hook works globally, because the URL of the browser itself is a central database
export function useAppQuerySearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = React.useMemo(
    () => Array.from(searchParams.values())?.[0],
    [searchParams],
  );
  console.log('🚀 ~ file: use-app-query-search.hook.ts ~ line 17 ~ useAppQuerySearch ~ queryParam', queryParam)

  return {
    queryParam,
    syncQuery: (_query: string) =>
      navigate({
        search: `?${createSearchParams({
          query: _query,
        })}`,
      }),
    toLevel1Page: () =>
      navigate({
        pathname: '/',
        search: `?${createSearchParams({
          query: queryParam,
        })}`,
      }),
    toLevel2Page: (jokeId: string) =>
      navigate({
        pathname: '/joke/' + jokeId,
        search: `?${createSearchParams({
          query: queryParam,
        })}`,
        
      }),
  };
}
