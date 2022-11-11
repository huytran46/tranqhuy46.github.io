import './Home.scss';

import React from 'react';

import { fetchAllJokes } from '../../api/joke.api';
import CategoryList from '../../components/CategoryList';
import JokeCard from '../../components/JokeCard';
import { retrieveJokes, storeJokes } from '../../joke.service';

const HomeView: React.FC = () => {
  const [activeCateId, setActiveCateId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchAllJokes().then((results) => {
      if (results?.result?.length) {
        storeJokes(results.result);
      }
    });
  }, []);

  const jokesByCategory = React.useMemo(
    () => (activeCateId != null ? retrieveJokes(activeCateId).slice(0, 6) : []),
    [activeCateId],
  );

  return (
    <main className="cj-home__main">
      <CategoryList
        onCategoryClick={(cateId) => {
          setActiveCateId(cateId);
        }}
      />

      <hr className="cj-home__hr-divider" />
      <div className="cj-joke-list__container">
        {activeCateId && (
          <div className="cj-joke-list__label__container">
            <span className="cj-joke-list__label">{activeCateId}</span>
          </div>
        )}
        <div className="cj-joke-list">
          {jokesByCategory.map((joke) => (
            <JokeCard
              key={joke.id}
              title={joke.value.split(/\s/)?.slice(0, 3)?.join(' ')}
              description={joke.value}
              // iconUrl={joke.icon_url}
            />
          ))}
        </div>
        <button>this is view more button</button>
      </div>
    </main>
  );
};

export default HomeView;
