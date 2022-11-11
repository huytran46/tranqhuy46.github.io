import './JokeDetail.scss';

import React from 'react';
import {useParams} from 'react-router-dom';

const JokeView: React.FC = () => {
  const {jokeId} = useParams();
  return <>{jokeId}</>;
};

export default JokeView;
