import './App.scss';

import clsx from 'clsx';
import React from 'react';

import {fetchAllJokes} from './api/joke.api';
import cover1PNG from './assets/cover.png';
import cover1WEBP from './assets/cover.webp';
import greenBoltPNG from './assets/green-bolt.png';
import greenBoltWEBP from './assets/green-bolt.webp';
import orangeBoltPNG from './assets/orange-bolt.png';
import orangeBoltWEBP from './assets/orange-bolt.webp';
import yellowBoltPNG from './assets/yellow-bolt.png';
import yellowBoltWEBP from './assets/yellow-bolt.webp';
import CategoryList from './components/CategoryList';
import ImageWithFallback from './components/ImageWithFallback';
import JokeCard from './components/JokeCard';
import Navbar from './components/NavBar';
import QueryPopoverInput from './components/QueryPopoverInput';
import {
  retrieveJokes,
  storeJokes,
  UNCATEGORIZED_CATEGORY_KEY,
} from './joke.service';
import {JokeModel} from './models/joke';

const AVAILABLE_COLOR_CLASS_NAMES: {
  fallback: string;
  src: string;
}[] = [
  {
    src: yellowBoltWEBP,
    fallback: yellowBoltPNG,
  },
  {
    src: orangeBoltWEBP,
    fallback: orangeBoltPNG,
  },
  {
    src: greenBoltWEBP,
    fallback: greenBoltPNG,
  },
];

function App() {
  const [activeCateId, setActiveCateId] = React.useState<string | null>(null);
  // const [jokes, setJokes] = React.useState<JokeModel[]>([]);

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
    <div className="cj-app">
      <Navbar />

      <div className="cj-app__jumbotron">
        <ImageWithFallback
          className="cj-app__jumbotron__cover"
          src={cover1WEBP}
          fallback={cover1PNG}
        />
        <div className="cj-app__jumbotron__imposter">
          <div className="cj-app__jumbotron__form-group">
            <h3 className="cj-app__jumbotron__form-group__label">
              The Joke Bible
            </h3>
            <h5 className="cj-app__jumbotron__form-group__desc">
              Daily laughs for you and yours
            </h5>
            <div className="cj-spacer" />
            <QueryPopoverInput<JokeModel>
              onSearch={async (query, setData) => {
                if (query?.length > 2) {
                  // NOTE: because of ChuckJokes API rule
                  const resp = await fetchAllJokes(query);
                  const {result} = resp;
                  setData(result);
                } else {
                  setData([]);
                }
              }}
              // onItemSelect={(item) => {}} // TODO: route to level 2
              renderItems={(
                jokes,
                {selectedItem, selectItemAndClosePopover},
              ) => (
                <ul>
                  {jokes.map((joke, jokeIdx) => (
                    <li
                      key={joke.id}
                      className={clsx('cj-joke-item', {
                        'cj-joke-item--active': selectedItem?.id === joke.id,
                      })}
                      onClick={() => selectItemAndClosePopover(joke)}>
                      <ImageWithFallback
                        className="cj-joke-item__icon"
                        {...AVAILABLE_COLOR_CLASS_NAMES[
                          jokeIdx % AVAILABLE_COLOR_CLASS_NAMES.length
                        ]}
                      />
                      <span className="cj-joke-item__label">
                        <span className="cj-joke-item__label__prefix">
                          {joke.categories[0] || UNCATEGORIZED_CATEGORY_KEY}
                        </span>
                        :&nbsp;{joke.value.split(/\s/)?.slice(0, 3)?.join(' ') + '...'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </div>
        </div>
      </div>

      <main className="cj-app__main">
        <CategoryList
          onCategoryClick={(cateId) => {
            setActiveCateId(cateId);
          }}
        />

        <hr className="cj-app__hr-divider" />
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

      <footer>
        this is footer with background img
        <div>
          this is imposter
          <div>
            this is call to action container
            <h5>this is call to action label</h5>
            <button>this is submit button</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
