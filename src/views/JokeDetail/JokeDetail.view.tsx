import './JokeDetail.scss';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {debounce} from 'lodash';
import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {
  dislikeJoke,
  fetchJokeById,
  fetchJokeInfo,
  likeJoke,
} from '../../api/joke.api';
import chevronLeftPNG from '../../assets/chevron-left.png';
import chevronLeftWEBP from '../../assets/chevron-left.webp';
import dislikeHandPNG from '../../assets/dislike-hand.png';
import dislikeHandWEBP from '../../assets/dislike-hand.webp';
import likeHandPNG from '../../assets/like-hand.png';
import likeHandWEBP from '../../assets/like-hand.webp';
import ImageWithFallback from '../../components/ImageWithFallback';
import JokeCard from '../../components/JokeCard';
import {retrieveJokes, UNCATEGORIZED_CATEGORY_KEY} from '../../joke.service';

const JokeView: React.FC = () => {
  const {jokeId} = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Queries
  const {
    data: loadedJoke,
    // loading,
    // execute: refetchJoke,
  } = useQuery({
    queryKey: ['fetchJokeById', jokeId],
    queryFn: ({queryKey}) => fetchJokeById(queryKey[1]),
  });

  const {
    data: jokeInfo,
    // loading,
  } = useQuery({
    queryKey: ['fetchJokeInfo', jokeId],
    queryFn: ({queryKey}) => fetchJokeInfo(queryKey[1]),
  });

  // Mutations
  const {mutateAsync: likeJokeFn} = useMutation({
    mutationFn: likeJoke,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['fetchJokeInfo', jokeId],
      });
    },
  });

  const {mutateAsync: dislikeJokeFn} = useMutation({
    mutationFn: dislikeJoke,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['fetchJokeInfo', jokeId],
      });
    },
  });

  const debouncedLike = React.useMemo(
    () =>
      debounce(() => {
        likeJokeFn(jokeId);
      }, 300),
    [jokeId, likeJokeFn],
  );

  const debouncedDislike = React.useMemo(
    () =>
      debounce(() => {
        dislikeJokeFn(jokeId);
      }, 300),
    [jokeId, dislikeJokeFn],
  );

  const topTenJokes = React.useMemo(
    () => retrieveJokes(UNCATEGORIZED_CATEGORY_KEY)?.slice(0, 10) ?? [],
    [],
  );

  return (
    <div className="cj-joke-view">
      <div className="cj-joke-view__inner">
        <ImageWithFallback
          className="cj-joke-view__back"
          src={chevronLeftWEBP}
          fallback={chevronLeftPNG}
          onClick={() => navigate('/')}
        />
        <div className="cj-joke-view__body">
          <div className="cj-joke-view__body--left">
            {loadedJoke != null && (
              <JokeCard
              
                title={loadedJoke.value.split(/\s/)?.slice(0, 3)?.join(' ')}
                description={loadedJoke.value}
                category={loadedJoke.categories[0]}
              />
            )}
            <div className="cj-joke-view__actions">
              <span className="cj-joke-view__actions__button">
                <button
                  className="cj-joke-view__actions__button__body cj-joke-view__actions__button__body--like"
                  onClick={() => {
                    debouncedLike();
                  }}>
                  <ImageWithFallback
                    src={likeHandWEBP}
                    fallback={likeHandPNG}
                  />
                </button>
                <span className="cj-joke-view__actions__button__append">
                  {jokeInfo?.like || 0}
                </span>
              </span>
              <span className="cj-joke-view__actions__button">
                <button
                  className="cj-joke-view__actions__button__body cj-joke-view__actions__button__body--dislike"
                  onClick={() => {
                    debouncedDislike();
                  }}>
                  <ImageWithFallback
                    src={dislikeHandWEBP}
                    fallback={dislikeHandPNG}
                  />
                </button>
                <span className="cj-joke-view__actions__button__append">
                  {jokeInfo?.dislike || 0}
                </span>
              </span>
            </div>
          </div>
          <div className="cj-joke-view__body__aside">
            <span className="cj-joke-view__body__aside__label">
              The top 10 jokes
            </span>
            <ul className="cj-joke-view__body__aside__list">
              {topTenJokes?.map((topJoke) => (
                <li
                  key={topJoke.id}
                  className="cj-joke-view__body__aside__item">
                  <Link
                    className="cj-joke-view__body__aside__item__link"
                    to={'/joke/' + topJoke.id}>
                    {topJoke.value.split(/\s/)?.slice(0, 3)?.join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeView;
