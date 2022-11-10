import './App.scss';

import React from 'react';

import {fetchAllJokes} from './api/joke.api';
import CategoryList from './components/CategoryList';
import JokeCard from './components/JokeCard';
import Navbar from './components/NavBar';
import {retrieveJokes, storeJokes} from './joke.service';
import {JokeModel} from './models/joke';

function App() {
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
    <div className="cj-app">
      <Navbar />

      <div>
        this is a jumbotron with the background
        <div>
          this is imposter
          <div>
            this is form group
            <label htmlFor=""> this is a label</label>
            <p> this is a desc</p>
            <div>
              this is a input group
              <input type="text" placeholder="this is an input" />
              <span>this is icon search</span>
            </div>
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
