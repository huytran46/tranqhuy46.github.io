import './JokeCard.scss';

import React from 'react';

import arrowRightWEBP from '../../assets/arrow-right.png';
import arrowRightPNG from '../../assets/arrow-right.webp';
import yellowBoltPNG from '../../assets/yellow-bolt.png';
import yellowBoltWEBP from '../../assets/yellow-bolt.webp';
import ImageWithFallback from '../ImageWithFallback';

interface JokeCardProps {
  title: string;
  description: string;
  icon?: JSX.Element;
  onSeeStatsClick?: () => void;
}

const DefaultJokeCardIcon = () => (
  <ImageWithFallback
    className="cj-default-prefix-icon"
    src={yellowBoltWEBP}
    fallback={yellowBoltPNG}
    alt="A joke card prefix icon"
  />
);

const SeeStatsJokeCardIcon = () => (
  <ImageWithFallback
    className="cj-see-stats-icon"
    src={arrowRightWEBP}
    fallback={arrowRightPNG}
    alt="A joke card prefix icon"
  />
);

const JokeCard: React.FC<JokeCardProps> = (props) => {
  const {
    title,
    description,
    icon = <DefaultJokeCardIcon />,
    onSeeStatsClick,
  } = props;

  return (
    <div className="cj-joke-card">
      <div className="cj-joke-card__header">
        <span className="cj-joke-card__icon">{icon}</span>
        <span className="cj-joke-card__title">{title}</span>
      </div>
      <div className="cj-joke-card__body">
        <div className="cj-joke-card__copy">{description}</div>
      </div>
      <div className="cj-joke-card__footer">
        <div className="cj-joke-card__actions">
          <button
            className="cj-joke-card__actions__button"
            onClick={onSeeStatsClick}>
            <span className="cj-joke-card__actions__button__body">
              see stats
            </span>
            <span className="cj-joke-card__actions__button__append">
              <SeeStatsJokeCardIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
