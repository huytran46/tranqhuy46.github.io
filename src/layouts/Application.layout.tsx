import './Application.scss';

import clsx from 'clsx';
import React from 'react';
import {Outlet} from 'react-router-dom';

import {fetchAllJokes} from '../api/joke.api';
import arrowRightPNG from '../assets/arrow-right.png';
import arrowRightWEBP from '../assets/arrow-right.webp';
import cover1PNG from '../assets/cover.png';
import cover1WEBP from '../assets/cover.webp';
import cover2PNG from '../assets/cover-2.png';
import cover2WEBP from '../assets/cover-2.webp';
import greenBoltPNG from '../assets/green-bolt.png';
import greenBoltWEBP from '../assets/green-bolt.webp';
import orangeBoltPNG from '../assets/orange-bolt.png';
import orangeBoltWEBP from '../assets/orange-bolt.webp';
import yellowBoltPNG from '../assets/yellow-bolt.png';
import yellowBoltWEBP from '../assets/yellow-bolt.webp';
import Button from '../components/Button';
import ImageWithFallback from '../components/ImageWithFallback';
import NavBar from '../components/NavBar';
import QueryPopoverInput from '../components/QueryPopoverInput';
import {useAppQuerySearch} from '../hooks/use-app-query-search.hook';
import {UNCATEGORIZED_CATEGORY_KEY} from '../joke.service';
import {JokeModel} from '../models/joke';

const AVAILABLE_ICONS: {
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

// function serializeFormQuery(){}
const ApplicationLayout: React.FC = () => {
  const querySearch = useAppQuerySearch();

  return (
    <div className="cj-app">
      <NavBar />

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
              defaultQuery={querySearch.queryParam}
              onSearch={async (query, setData) => {
                querySearch.syncQuery(query);
                if (query?.length > 2) {
                  // NOTE: because of ChuckJokes API rule
                  const resp = await fetchAllJokes(query);
                  const {result} = resp;

                  // NOTE: base on business requirement
                  if (result.length === 1) {
                    setData([]);
                    querySearch.syncQuery('');
                    querySearch.toLevel2Page(result[0].id);
                    return;
                  }
                  setData(result);
                } else {
                  setData([]);
                }
              }}
              onItemSelect={(joke) => {
                if (joke?.id != null) {
                  querySearch.toLevel2Page(joke.id);
                }
              }}
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
                        {...AVAILABLE_ICONS[jokeIdx % AVAILABLE_ICONS.length]}
                      />
                      <span className="cj-joke-item__label">
                        <span className="cj-joke-item__label__prefix">
                          {joke.categories[0] || UNCATEGORIZED_CATEGORY_KEY}
                        </span>
                        :&nbsp;
                        {joke.value.split(/\s/)?.slice(0, 3)?.join(' ') + '...'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </div>
        </div>
      </div>

      <div className="cj-app__main">
        <Outlet />
      </div>

      <footer className="cj-app__footer">
        <ImageWithFallback
          className="cj-app__footer__cover"
          src={cover2WEBP}
          fallback={cover2PNG}
        />
        <div className="cj-app__footer__imposter">
          <div className="cj-app__footer__cta">
            <h5 className="cj-app__footer__cta__label">
              get jokes, get paid for submitting{' '}
            </h5>
            <Button
              variant="ghost"
              rightIcon={
                <ImageWithFallback
                  src={arrowRightWEBP}
                  fallback={arrowRightPNG}
                  alt="A joke card prefix icon"
                />
              }>
              submit jokes
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationLayout;
